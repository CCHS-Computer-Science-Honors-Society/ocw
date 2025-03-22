"use client";;
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTRPC } from "@/trpc/react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { type Unit } from "./types";
import { getColumns } from "./unit.columns";
import { toast } from "sonner";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export const UnitTable = (props: { id: string }) => {
  const api = useTRPC();
  const { id } = props;
  const {
    data: data
  } = useSuspenseQuery(api.units.getTableData.queryOptions({
    courseId: id,
  }));
  const queryClient = useQueryClient();
  const { mutate } = useMutation(api.units.update.mutationOptions({
    onError(error, __, ctx) {
      const typedCtx = ctx as { prevData?: Unit[] };
      if (!typedCtx.prevData) return;
      queryClient.setQueryData(api.units.getTableData.queryKey({ courseId: id }), typedCtx.prevData);
      toast.error(
        error.message ?? "An error occurred while updating the unit.",
      );
    },

    async onMutate(newData) {
      await queryClient.cancelQueries(api.units.getTableData.pathFilter());
      const prevData = queryClient.getQueryData(api.units.getTableData.queryKey());

      queryClient.setQueryData(api.units.getTableData.queryKey({ courseId: id }), (oldData) => {
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
      void queryClient.invalidateQueries(api.units.getTableData.pathFilter());
    },
  }));

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
