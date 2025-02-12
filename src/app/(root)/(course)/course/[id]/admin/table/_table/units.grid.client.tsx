
"use client"

import { api } from "@/trpc/react"
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import React from "react"
import { Unit } from "./types";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useSkipper } from "./hooks";
import { Button } from "@/components/ui/button";

export const getColumns = (): ColumnDef<Unit>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue, row: { index }, column: { id }, table }) => {
        const initialValue = getValue<string>();
        const [value, setValue] = React.useState(initialValue);

        const onBlur = () => {
          table.options.meta?.updateData(index, id as keyof Unit, value);
        };

        React.useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        return (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border"
            onBlur={onBlur}
          />
        );
      },
    },

    {
      accessorKey: "isPublished",
      header: "Published",
      cell: ({ getValue, row: { index }, column: { id }, table }) => {
        const initialValue = getValue<boolean>();
        const [value, setValue] = React.useState(initialValue);

        const onChange = () => {
          const newValue = !value;
          setValue(newValue);
          table.options.meta?.updateData(index, id as keyof Unit, newValue);
        };

        React.useEffect(() => {
          setValue(initialValue);
        }, [initialValue]);

        return (
          <Checkbox
            className="w-8 h-8 border"
            checked={value}
            onCheckedChange={onChange}
          />
        );
      },
    },
  ];
}
export const UnitTable = (props: {
  id: string
}) => {
  const { id } = props
  const [data] = api.units.getTableData.useSuspenseQuery({
    courseId: id
  })
  const utils = api.useUtils()
  const { mutate } = api.units.update.useMutation({
    async onMutate(newData) {
      await utils.units.getTableData.cancel();
      const prevData = utils.units.getTableData.getData();

      utils.units.getTableData.setData({ courseId: id }, (oldData) => {
        if (!oldData) return oldData;

        const index = oldData.findIndex(
          (item) => item.id === newData.data.id
        );
        if (index === -1) return oldData;

        const updated = [...oldData];
        const currentItem = updated[index];

        if (!currentItem) return oldData;

        updated[index] = {
          ...currentItem,
          name: newData.data.name ?? currentItem.name,
          isPublished: newData.data.isPublished ?? currentItem.isPublished,
          courseId: newData.courseId ?? currentItem.courseId,
          id: newData.data.id ?? currentItem.id,
        };
        return updated;
      });
      return { prevData };
    },
  })

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const table = useReactTable({
    data,
    autoResetPageIndex,
    columns: getColumns(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    meta: {
      updateData: (
        rowIndex: number,
        columnId: keyof Unit,
        value: unknown
      ) => {
        const row = data[rowIndex];
        if (!row) return;

        skipAutoResetPageIndex()
        mutate({
          courseId: row.courseId,
          data: { id: row.id, [columnId]: value },
        });
      },
    },
    debugTable: true,
  })

  return <div>
    <div className="p-2">
      <div className="h-2" />
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>

          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>

  </div>
}

