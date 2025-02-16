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
import { getColumns } from "./lesson.columns";
import { Lesson } from "./types";
import { toast } from "sonner";

type LessonTableProps = {
  units: {
    label: string;
    value: string;
  }[];
  courseId: string;
};

export const LessonTable = ({ units, courseId }: LessonTableProps) => {
  const [data] = api.lesson.getTableData.useSuspenseQuery({
    courseId: courseId,
  });
  const utils = api.useUtils();
  const { mutate } = api.lesson.update.useMutation({
    onError(error, __, ctx) {
      const typedCtx = ctx as { prevData?: Lesson[] };
      if (!typedCtx.prevData) return;
      utils.lesson.getTableData.setData({ courseId: courseId }, typedCtx.prevData);
      //make sure to set that prevData is lesson[]
      toast.error(
        error.message ?? "An error occurred while updating the lesson.",
      );
    },
    onSettled() {
      // Sync with server once mutation has settled
      void utils.lesson.getTableData.invalidate();
    },
    async onMutate(newData) {
      await utils.lesson.getTableData.cancel();
      const prevData = utils.lesson.getTableData.getData();
      utils.lesson.getTableData.setData({ courseId: courseId }, (oldData) => {
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
  });

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
            embed: { [columnId]: value },
          });
        } else {
          mutate({
            id: row.id,
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
