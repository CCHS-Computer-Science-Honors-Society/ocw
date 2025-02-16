"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { type Unit } from "./types";
import { getColumns } from "./unit.columns";

export const UnitTable = (props: { id: string }) => {
  const { id } = props;
  const [data] = api.units.getTableData.useSuspenseQuery({
    courseId: id,
  });
  const utils = api.useUtils();
  const { mutate } = api.units.update.useMutation({
    onError(_, __, ctx) {
      const typedCtx = ctx as { prevData?: Unit[] };
      if (!typedCtx.prevData) return;
      utils.units.getTableData.setData({ courseId: id }, typedCtx.prevData);
    },

    async onMutate(newData) {
      await utils.units.getTableData.cancel();
      const prevData = utils.units.getTableData.getData();

      utils.units.getTableData.setData({ courseId: id }, (oldData) => {
        if (!oldData) return oldData;

        const index = oldData.findIndex((item) => item.id === newData.data.id);
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
    onSettled() {
      // Sync with server once mutation has settled
      void utils.units.getTableData.invalidate();
    },
  });

  const table = useReactTable({
    data,
    columns: getColumns(),
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: keyof Unit, value: unknown) => {
        const row = data[rowIndex];
        if (!row) return;
        mutate({
          courseId: row.courseId,
          data: { id: row.id, [columnId]: value },
        });
      },
    },
    debugTable: false,
  });

  return (
    <div>
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
                        header.getContext(),
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
