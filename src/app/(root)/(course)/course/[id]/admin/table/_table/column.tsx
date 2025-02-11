
"use client"

import { api } from "@/trpc/react"
import { ColumnDef, flexRender, getCoreRowModel, RowData, useReactTable } from "@tanstack/react-table"
import React from "react"

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: keyof Unit, value: unknown) => void
  }
}

export type Unit = {
  id: string;
  name: string;
  courseId: string;
  isPublished: boolean;
}
export const columns: ColumnDef<Unit>[] = [
  {
    accessorKey: "id",
    header: "ID",
    // Assuming IDs are not editable
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
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    },
  },
  {
    accessorKey: "courseId",
    header: "Course ID",
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
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
        <input
          type="checkbox"
          checked={value}
          onChange={onChange}
        />
      );
    },
  },
];

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
    columns,
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
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  return (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>

  </div>
}

