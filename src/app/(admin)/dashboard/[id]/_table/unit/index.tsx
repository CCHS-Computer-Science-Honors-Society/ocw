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
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
import { columns, type Unit } from "./columns"; // Import Unit type and columns

// Type for the update mutation input
type UnitUpdateInput = RouterInputs["units"]["update"];

// --- DraggableRow Component ---
function DraggableRow({ row }: { row: Row<Unit> }) {
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

// --- DataTable Component ---
export function UnitTable({ courseId }: { courseId: string }) {
  const api = useTRPC();
  const queryClient = useQueryClient();

  // --- Data Fetching ---
  const queryOptions = api.units.getTableData.queryOptions({ courseId });
  const { data } = useSuspenseQuery(queryOptions);

  // --- State for Pending Cell Updates ---
  const [pendingUpdates, setPendingUpdates] = React.useState<
    Record<string, boolean>
  >({});

  // --- Update Mutation (using your provided logic) ---
  const { mutate: updateUnitMutate } = useMutation(
    api.units.update.mutationOptions({
      async onMutate(newData) {
        // Determine field being updated for pending state management
        const changedFields = Object.keys(newData.data);
        const field = changedFields.find((k) => k !== "id"); // Find the changed field (excluding id)
        const optimisticUpdateKey = `${newData.data.id}-${field}`;

        setPendingUpdates((prev) => ({
          ...prev,
          [optimisticUpdateKey]: true,
        }));

        await queryClient.cancelQueries({ queryKey: queryOptions.queryKey });
        const prevData = queryClient.getQueryData<Unit[]>(
          queryOptions.queryKey,
        );

        // Optimistically update cache
        queryClient.setQueryData<Unit[]>(queryOptions.queryKey, (oldData) => {
          if (!oldData) return oldData;
          const index = oldData.findIndex(
            (item) => item.id === newData.data.id,
          );
          if (index === -1) return oldData;

          const updated = [...oldData];
          const currentItem = updated[index];
          if (!currentItem) return oldData;

          // Apply updates from newData.data
          updated[index] = {
            ...currentItem,
            name: newData.data.name ?? currentItem.name,
            isPublished: newData.data.isPublished ?? currentItem.isPublished,
            // courseId and id are usually not updated this way, but included for completeness based on your example
            courseId: newData.courseId ?? currentItem.courseId,
            id: newData.data.id ?? currentItem.id,
          };
          return updated;
        });

        return { prevData, optimisticUpdateKey };
      },
      onError(error, __, context) {
        const { prevData, optimisticUpdateKey } = context as {
          prevData?: Unit[];
          optimisticUpdateKey?: string;
        };
        if (prevData) {
          queryClient.setQueryData(queryOptions.queryKey, prevData);
        }
        toast.error(
          error.message ?? "An error occurred while updating the unit.",
        );
        if (optimisticUpdateKey) {
          setPendingUpdates((prev) => {
            const newState = { ...prev };
            delete newState[optimisticUpdateKey];
            return newState;
          });
        }
      },
      onSettled(data, error, variables, context) {
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
      },
      onSuccess() {
        // Optionally clear all pending states on success if needed, though onSettled usually covers it
        // setPendingUpdates({});
      },
    }),
  );

  const { mutate: reorderUnitMutate, isPending: isReorderPending } =
    useMutation(
      api.units.reorder.mutationOptions({
        // Assuming an endpoint like this exists
        async onMutate(variables) {
          await queryClient.cancelQueries({ queryKey: queryOptions.queryKey });
          const prevData = queryClient.getQueryData<Unit[]>(
            queryOptions.queryKey,
          );
          queryClient.setQueryData<Unit[]>(queryOptions.queryKey, (oldData) => {
            if (!oldData) return [];
            const itemMap = new Map(oldData.map((item) => [item.id, item]));
            const reordered = variables.data
              .map((orderedItem) => itemMap.get(orderedItem.id))
              .filter((item): item is Unit => !!item);
            return reordered;
          });
          return { prevData };
        },
        onError(error, variables, context) {
          const { prevData } = context as { prevData?: Unit[] };
          if (prevData) {
            queryClient.setQueryData(queryOptions.queryKey, prevData);
          }
          toast.error(
            error.message ?? "An error occurred while reordering units.",
          );
        },
        onSettled() {
          void queryClient.invalidateQueries({
            queryKey: queryOptions.queryKey,
          });
        },
      }),
    );

  // --- Local Table State ---
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
    () => data?.map(({ id }) => id) || [],
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
      courseId, // Pass courseId down
      updateCell: (rowId, field, value) => {
        // Construct the input for the unit update mutation
        const mutationInput: UnitUpdateInput = {
          courseId: courseId,
          data: {
            id: rowId,
            [field]: value,
          },
        };
        updateUnitMutate(mutationInput);
      },
      getCellUpdatePending: (rowId, field) => {
        return !!pendingUpdates[`${rowId}-${field}`];
      },
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
      if (oldIndex === -1 || newIndex === -1 || !data) return;

      const reorderedData = arrayMove(data, oldIndex, newIndex);
      queryClient.setQueryData(queryOptions.queryKey, reorderedData);
      const reorderPayload = reorderedData.map((item, index) => ({
        id: item.id,
        position: index, // Use the new index as the position
      }));

      reorderUnitMutate({
        courseId: courseId,
        data: reorderPayload,
      });
    }
  }

  // --- Render Logic ---
  return (
    <div className="flex w-full flex-col justify-start gap-4 p-4 lg:p-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div>{/* Filters can go here */}</div>
        <div className="flex items-center gap-2"></div>
      </div>

      {/* Table Area */}
      <div className="relative">
        {/* Optional: Loading overlay during reorder save */}
        {isReorderPending && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg border bg-background/80 backdrop-blur-xs">
            <p className="text-sm text-muted-foreground">Saving order...</p>
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
              <TableHeader className="sticky top-0 z-10 bg-muted">
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
                      No units found.
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
        <div className="flex-1 text-sm text-muted-foreground">
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
