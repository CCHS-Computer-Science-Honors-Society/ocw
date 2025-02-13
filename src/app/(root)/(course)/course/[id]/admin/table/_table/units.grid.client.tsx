
"use client"

import { api } from "@/trpc/react"
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import React from "react"
import { Unit } from "./types";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export const getColumns = (): ColumnDef<Unit>[] => {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Name",
      function NameCell(props: {
        initialValue: string;
        rowIndex: number;
        columnId: keyof Unit;
        table: any;
      }) {
        const [value, setValue] = React.useState(props.initialValue);
        React.useEffect(() => {
          setValue(props.initialValue);
        }, [props.initialValue]);
        const handleBlur = () => {
          props.table.options.meta?.updateData(props.rowIndex, props.columnId, value);
        };
        return (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
          />
        );
      }
      
      cell: ({ getValue, row: { index }, column: { id }, table }) => (
        <NameCell
          initialValue={getValue<string>()}
          rowIndex={index}
          columnId={id as keyof Unit}
          table={table}
        />
      ),
    },

    {
      accessorKey: "isPublished",
      header: "Published",
function PublishedCell(props: {
  initialValue: boolean;
  rowIndex: number;
  columnId: keyof Unit;
  table: any;
}) {
  const [checked, setChecked] = React.useState(props.initialValue);
  React.useEffect(() => {
    setChecked(props.initialValue);
  }, [props.initialValue]);
  const handleChange = () => {
    const newValue = !checked;
    setChecked(newValue);
    props.table.options.meta?.updateData(props.rowIndex, props.columnId, newValue);
  };
  return <Checkbox checked={checked} onCheckedChange={handleChange} />;
}

// ... Other parts of the file remain unchanged ...

cell: ({ getValue, row: { index }, column: { id }, table }) => (
  <PublishedCell
    initialValue={getValue<boolean>()}
    rowIndex={index}
    columnId={id as keyof Unit}
    table={table}
  />
),
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

  const table = useReactTable({
    data,
    columns: getColumns(),
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (
        rowIndex: number,
        columnId: keyof Unit,
        value: unknown
      ) => {
        const row = data[rowIndex];
        if (!row) return;
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
    </div>

  </div>
}

