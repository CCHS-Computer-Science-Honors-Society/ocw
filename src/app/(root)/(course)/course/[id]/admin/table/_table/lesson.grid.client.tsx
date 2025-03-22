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
import { getColumns } from "./lesson.columns";
import type { Lesson } from "./types";
import { toast } from "sonner";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

type LessonTableProps = {
  units: {
    label: string;
    value: string;
  }[];
  courseId: string;
};

export const LessonTable = ({ units, courseId }: LessonTableProps) => {
  const api = useTRPC();
  const {
    data: data
  } = useSuspenseQuery(api.lesson.getTableData.queryOptions({
    courseId: courseId,
  }));
  const queryClient = useQueryClient();
  const { mutate } = useMutation(api.lesson.update.mutationOptions({
    onError(error, __, ctx) {
      const typedCtx = ctx as unknown as { prevData?: Lesson[] };
      if (!typedCtx.prevData) return;
      queryClient.setQueryData(
        api.lesson.getTableData.queryKey({ courseId: courseId }),
        typedCtx.prevData
      );
      //make sure to set that prevData is lesson[]
      toast.error(
        error.message ?? "An error occurred while updating the lesson.",
      );
    },
    onSettled() {
      // Sync with server once mutation has settled
      void queryClient.invalidateQueries(api.lesson.getTableData.pathFilter());
    },
    async onMutate(newData) {
      await queryClient.cancelQueries(api.lesson.getTableData.pathFilter());
      const prevData = queryClient.getQueryData(api.lesson.getTableData.queryKey());
      queryClient.setQueryData(api.lesson.getTableData.queryKey({ courseId: courseId }), (oldData) => {
        if (!oldData) return oldData;
        const index = oldData.findIndex((item) => item.id === newData.id);
        if (index === -1) return oldData;
        const currentItem = oldData[index];
        if (!currentItem) return oldData;
        const updatedItem = {
          ...currentItem,
          name: newData.name ?? currentItem.name,
          isPublished: newData.isPublished ?? currentItem.isPublished,
          pureLink: newData.pureLink ?? currentItem.pureLink,
          unitId: newData.unitId ?? currentItem.unitId,
          embedPassword: newData.embed?.password ?? currentItem.embedPassword,
          embedUrl: newData.embed?.embedUrl ?? currentItem.embedUrl,
          id: newData.id ?? currentItem.id,
        };
        return [
          ...oldData.slice(0, index),
          updatedItem,
          ...oldData.slice(index + 1),
        ];
      });
      return { prevData };
    },
  }));

  const table = useReactTable({
    data,
    columns: getColumns({ units }),
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        const row = data[rowIndex];
        if (!row) return;
        if (columnId === "embedUrl" || columnId === "embedPassword") {
          mutate({
            id: row.id,
            courseId,
            embed: { [columnId]: value },
          });
        } else {
          mutate({
            id: row.id,
            courseId,
            [columnId]: value,
          });
        }
      },
    },
  });

  return (
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
  );
};
