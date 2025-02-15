"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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
import { env } from "@/env";
import { ContentTypeEnum } from "@/server/db/schema";
import { api } from "@/trpc/react";
import {
  CellContext,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { Lesson } from "./types";

type LessonTableProps = {
  units: {
    label: string;
    value: string;
  }[];
  courseId: string;
};

const NameCell = ({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<Lesson, string>): JSX.Element => {
  const initialValue = getValue<string>();
  const [value, setValue] = React.useState(initialValue);
  const onBlur = () =>
    table.options.meta?.updateData(index, id as keyof Lesson, value);
  React.useEffect(() => setValue(initialValue), [initialValue]);
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};

const PublishedCell = ({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<Lesson, string>): JSX.Element => {
  const initialValue = getValue<boolean>();
  const [value, setValue] = React.useState(initialValue);
  const onChange = () => {
    const newValue = !value;
    setValue(newValue);
    table.options.meta?.updateData(index, id as keyof Lesson, newValue);
  };
  React.useEffect(() => setValue(initialValue), [initialValue]);
  return (
    <Checkbox className="h-8 w-8" checked={value} onCheckedChange={onChange} />
  );
};

export const UnitSelectCell = (units: { label: string; value: string }[]) => {
  return ({
    getValue,
    row: { index },
    column: { id },
    table,
  }: CellContext<Lesson, string>): JSX.Element => {
    const initialValue = getValue<string>();
    const [value, setValue] = React.useState(initialValue);
    const [open, setOpen] = React.useState(false);
    function toggleOpen() {
      if (open) {
        table.options.meta?.updateData(index, id as keyof Lesson, value);
      }
      setOpen(!open);
    }
    React.useEffect(() => setValue(initialValue), [initialValue]);
    return (
      <Select
        onValueChange={setValue}
        value={value}
        defaultValue={value}
        open={open}
        onOpenChange={toggleOpen}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder={"Select a value"} />
        </SelectTrigger>
        <SelectContent>
          {units.map((unit) => (
            <SelectItem value={unit.value} key={unit.value}>
              {unit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };
};

const ContentTypeSelectCell = ({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<Lesson, boolean>): JSX.Element => {
  const initialValue = getValue<string>();
  const [value, setValue] = React.useState(initialValue);
  const [open, setOpen] = React.useState(false);
  function openAndSave() {
    if (open) {
      table.options.meta?.updateData(index, id as keyof Lesson, value);
    }
    setOpen(!open);
  }
  React.useEffect(() => setValue(initialValue), [initialValue]);
  return (
    <Select
      onValueChange={setValue}
      value={value}
      defaultValue={value}
      open={open}
      onOpenChange={openAndSave}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder={"Select a value"} />
      </SelectTrigger>
      <SelectContent>
        {ContentTypeEnum.map((type) => (
          <SelectItem value={type} key={type}>
            {type}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const EmbedPasswordCell = ({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<Lesson, boolean>): JSX.Element => {
  const initialValue = getValue<string>() || "";
  const [value, setValue] = React.useState(initialValue);
  const onBlur = () =>
    table.options.meta?.updateData(index, id as keyof Lesson, value);
  React.useEffect(() => setValue(initialValue), [initialValue]);
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};

const EmbedUrlCell = ({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<Lesson, string>): JSX.Element => {
  const initialValue = getValue<string>() || "";
  const [value, setValue] = React.useState(initialValue);
  const onBlur = () =>
    table.options.meta?.updateData(index, id as keyof Lesson, value);
  React.useEffect(() => setValue(initialValue), [initialValue]);
  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};

export const getColumns = ({
  units,
}: {
  units: {
    label: string;
    value: string;
  }[];
}): ColumnDef<Lesson>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: NameCell,
  },
  {
    accessorKey: "unitId",
    header: "Unit",
    cell: UnitSelectCell(units),
  },
  {
    accessorKey: "isPublished",
    header: "Published",
    cell: PublishedCell,
  },
  {
    accessorKey: "pureLink",
    header: "Pure Link",
    cell: PublishedCell,
  },
  {
    accessorKey: "contentType",
    header: "Content Type",
    cell: ContentTypeSelectCell,
  },
  {
    accessorKey: "embedPassword",
    header: "Embed Password",
    cell: EmbedPasswordCell,
  },
  {
    accessorKey: "embedUrl",
    header: "Embed URL",
    cell: EmbedUrlCell,
  },
];

export const LessonTable = ({ units, courseId }: LessonTableProps) => {
  const [data] = api.lesson.getTableData.useSuspenseQuery({
    courseId: courseId,
  });
  const utils = api.useUtils();
  const { mutate } = api.lesson.update.useMutation({
    onError(err, ctx) {
      // If the mutation fails, use the context-value from onMutate
      //@ts-ignore
      utils.lesson.getTableData.setData({ courseId: courseId }, ctx?.prevData);
    },
    onSettled() {
      // Sync with server once mutation has settled
      utils.lesson.getTableData.invalidate();
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
    debugTable: env.NODE_ENV === "development",
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
