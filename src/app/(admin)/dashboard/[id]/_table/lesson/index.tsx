"use client";

import * as React from "react";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ColumnsIcon,
  PlusIcon,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { type RouterInputs, useTRPC } from "@/trpc/react";
import { columns } from "./columns";

// Inside the DataTable component function, before useReactTable
type LessonUpdateInput = RouterInputs["lesson"]["update"];
// 1. Define the Zod schema (matching tRPC Lesson output)
export const itemSchema = z.object({
  id: z.string(),
  name: z.string(),
  unitId: z.string(),
  contentType: z.enum([
    "google_docs",
    "notion",
    "quizlet",
    "tiptap",
    "flashcard",
  ]),
  isPublished: z.boolean(),
  pureLink: z.boolean(),
  embedPassword: z.string().nullable(),
  embedUrl: z.string().nullable(),
  embedId: z.string().nullable(),
});

// --- Render Logic ---
export type DataItem = z.infer<typeof itemSchema>;
export type Lesson = DataItem;

export type UnitOption = {
  label: string;
  value: string;
};

type GetUnitsFunc = Promise<{ label: string; value: string }[]>;

function DraggableRow({ row }: { row: Row<DataItem> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function LessonTable({
  courseId,
  unitsPromise,
  unitId,
}: {
  courseId: string;
  unitsPromise: GetUnitsFunc;
  unitId?: string;
}) {
  const api = useTRPC();
  const queryClient = useQueryClient();
  const units = React.use(unitsPromise);

  // --- Data Fetching ---
  const queryOptions = api.lesson.getTableData.queryOptions({
    courseId,
    unitId,
  });
  const { data } = useQuery(queryOptions);

  // --- State for Pending Cell Updates ---
  const [pendingUpdates, setPendingUpdates] = React.useState<
    Record<string, boolean>
  >({});

  // --- Update Mutation ---
  const { mutate: updateLessonMutate } = useMutation(
    api.lesson.update.mutationOptions({
      async onMutate(newData) {
        // Determine field being updated for pending state management
        const changedFields = Object.keys(newData).filter(
          (k) => k !== "id" && k !== "courseId", // Exclude IDs
        );
        let field = changedFields[0]; // Assume one field change per call
        if (field === "embed" && newData.embed) {
          // If embed object changed, find which key within embed changed
          field = Object.keys(newData.embed)[0];
        }
        const optimisticUpdateKey = `${newData.id}-${field}`;

        setPendingUpdates((prev) => ({
          ...prev,
          [optimisticUpdateKey]: true,
        }));

        await queryClient.cancelQueries({ queryKey: queryOptions.queryKey });
        const prevData = queryClient.getQueryData<Lesson[]>(
          queryOptions.queryKey,
        );

        // Optimistically update cache
        queryClient.setQueryData<Lesson[]>(queryOptions.queryKey, (oldData) => {
          if (!oldData) return oldData;
          const index = oldData.findIndex((item) => item.id === newData.id);
          if (index === -1) return oldData;
          const currentItem = oldData[index];
          if (!currentItem) return oldData;

          // Merge logic from your original code
          const updatedItem = {
            ...currentItem,
            name: newData.name ?? currentItem.name,
            isPublished: newData.isPublished ?? currentItem.isPublished,
            pureLink: newData.pureLink ?? currentItem.pureLink,
            unitId: newData.unitId ?? currentItem.unitId,
            embedPassword: newData.embed?.password ?? currentItem.embedPassword,
            embedUrl: newData.embed?.embedUrl ?? currentItem.embedUrl,
          };
          return [
            ...oldData.slice(0, index),
            updatedItem,
            ...oldData.slice(index + 1),
          ];
        });

        return { prevData, optimisticUpdateKey };
      },
      onError(error, __, context) {
        const { prevData, optimisticUpdateKey } = context as {
          prevData?: Lesson[];
          optimisticUpdateKey?: string;
        };
        if (prevData) {
          queryClient.setQueryData(queryOptions.queryKey, prevData);
        }
        toast.error(
          error.message ?? "An error occurred while updating the lesson.",
        );
        if (optimisticUpdateKey) {
          setPendingUpdates((prev) => {
            const newState = { ...prev };
            delete newState[optimisticUpdateKey];
            return newState;
          });
        }
      },
      onSettled(context) {
        const { optimisticUpdateKey } = context as {
          optimisticUpdateKey?: string;
        };
        if (optimisticUpdateKey) {
          setPendingUpdates((prev) => {
            const newState = { ...prev };
            delete newState[optimisticUpdateKey];
            return newState;
          });
        }
        // Invalidate to ensure consistency after optimistic update settles
        void queryClient.invalidateQueries({ queryKey: queryOptions.queryKey });

        //remove the pending updates
      },
      // onSuccess can be omitted as invalidation handles UI update
      onSuccess() {
        setPendingUpdates({});
      },
    }),
  );

  // --- Reorder Mutation ---
  const { mutate: reorderLessonMutate, isPending: isReorderPending } =
    useMutation(
      api.lesson.reorder.mutationOptions({
        async onMutate(variables) {
          await queryClient.cancelQueries({ queryKey: queryOptions.queryKey });
          const prevData = queryClient.getQueryData<Lesson[]>(
            queryOptions.queryKey,
          );

          queryClient.setQueryData<Lesson[]>(
            queryOptions.queryKey,
            (oldData) => {
              if (!oldData) return [];
              const itemMap = new Map(oldData.map((item) => [item.id, item]));
              const reordered = variables.data
                .map((orderedItem) => itemMap.get(orderedItem.id))
                .filter((item): item is Lesson => !!item);

              return reordered;
            },
          );
          return { prevData };
        },
        onError(error, context) {
          const { prevData } = context as { prevData?: Lesson[] };
          if (prevData) {
            queryClient.setQueryData(queryOptions.queryKey, prevData);
          }
          toast.error(
            error.message ?? "An error occurred while reordering lessons.",
          );
        },
        onSettled() {
          void queryClient.invalidateQueries({
            queryKey: queryOptions.queryKey,
          });
        },
      }),
    );

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // --- DnD Setup ---
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) ?? [],
    [data],
  );

  // --- React Table Instance ---
  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    meta: {
      units,
      courseId,
      updateCell: (rowId: string, field: string, value: unknown) => {
        const input: LessonUpdateInput = { id: rowId, courseId };
        if (field === "embedUrl" || field === "embedPassword") {
          const key = field === "embedUrl" ? "embedUrl" : "password";
          input.embed = { [key]: value as string };
        } else {
          // @ts-expect-error dynamic assignment
          input[field] = value;
        }
        console.log(input);
        updateLessonMutate(input);
      },
      getCellUpdatePending: (rowId, field) =>
        !!pendingUpdates[`${rowId}-${field}`],
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // --- Drag End Handler ---
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);
      if (oldIndex === -1 || newIndex === -1 || !data) return; // Exit if indices invalid or data missing

      // Perform optimistic update locally first
      const reorderedData = arrayMove(data, oldIndex, newIndex);
      // Optimistically update the cache
      queryClient.setQueryData(queryOptions.queryKey, reorderedData);

      // --- Prepare and Trigger Reorder Mutation ---
      // Assumption: Reordering happens within a single unit context visible in the table,
      // or the backend handles reordering across units based on the list.
      // We need the unitId for the backend endpoint.
      const targetUnitId = reorderedData[newIndex]?.unitId; // Get unitId from the moved item

      if (!targetUnitId) {
        console.error("Could not determine unitId for reordering.");
        toast.error("Failed to save order: Unit information missing.");
        // Optionally revert optimistic update here if unitId is crucial and missing
        queryClient.setQueryData(queryOptions.queryKey, data); // Revert
        return;
      }

      // Create the payload for the backend
      const reorderPayload = reorderedData
        // Filter for the specific unit being reordered if necessary
        // .filter(item => item.unitId === targetUnitId)
        .map((item, index) => ({
          id: item.id,
          position: index, // Use the new index as the position
        }));

      // Call the reorder mutation
      reorderLessonMutate({
        unitId: targetUnitId, // Send the relevant unitId
        courseId: courseId,
        data: reorderPayload,
      });

      // Optional: Show pending state feedback
      // toast.info("Saving new order..."); // Handled by mutation pending state if desired
    }
  }

  // --- Render Logic ---
  return (
    <div className="flex w-full flex-col justify-start gap-4 p-4 lg:p-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div>{/* Filters can go here */}</div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <ColumnsIcon className="mr-2 size-4" />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide(),
                )
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {/* Simple way to display column name */}
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" className="h-8">
            <PlusIcon className="mr-2 size-4" />
            Add Item {/* TODO: Implement Add functionality */}
          </Button>
        </div>
      </div>

      {/* Table Area */}
      <div className="relative">
        {/* Optional: Loading overlay during reorder save */}
        {isReorderPending && (
          <div className="bg-background/80 absolute inset-0 z-20 flex items-center justify-center rounded-lg border backdrop-blur-xs">
            <p className="text-muted-foreground text-sm">Saving order...</p>
          </div>
        )}
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No lessons found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
