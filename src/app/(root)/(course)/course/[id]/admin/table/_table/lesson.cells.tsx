// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
/** eslint-disable react-hooks/rules-of-hooks */
import { ContentTypeEnum } from "@/server/db/schema";
import { type Lesson } from "./types";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const getColumns = ({
  units,
}: {
  units: { label: string; value: string }[];
}): ColumnDef<Lesson>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue, row, column, table }) => {
      const initialValue = getValue<string>();
      const [value, setValue] = React.useState(initialValue);
      const onBlur = () =>
        table.options.meta?.updateData(
          row.index,
          column.id as keyof Lesson,
          value,
        );
      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);
      return (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    },
  },
  {
    accessorKey: "unitId",
    header: "Unit",
    cell: ({ getValue, row, column, table }) => {
      const initialValue = getValue<string>();
      const [value, setValue] = React.useState(initialValue);
      const [open, setOpen] = React.useState(false);
      const toggleOpen = () => {
        if (open) {
          table.options.meta?.updateData(
            row.index,
            column.id as keyof Lesson,
            value,
          );
        }
        setOpen(!open);
      };
      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);
      return (
        <Select
          onValueChange={setValue}
          value={value}
          defaultValue={value}
          open={open}
          onOpenChange={toggleOpen}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="select a value" />
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
    },
  },
  {
    accessorKey: "isPublished",
    header: "Published",
    cell: ({ getValue, row, column, table }) => {
      const initialValue = getValue<boolean>();
      const [value, setValue] = React.useState(initialValue);
      const onChange = () => {
        const newValue = !value;
        setValue(newValue);
        table.options.meta?.updateData(
          row.index,
          column.id as keyof Lesson,
          newValue,
        );
      };
      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);
      return (
        <Checkbox
          className="h-8 w-8"
          checked={value}
          onCheckedChange={onChange}
        />
      );
    },
  },
  {
    accessorKey: "pureLink",
    header: "Pure Link",
    cell: ({ getValue, row, column, table }) => {
      // using the same pattern as isPublished
      const initialValue = getValue<boolean>();
      const [value, setValue] = React.useState(initialValue);
      const onChange = () => {
        const newValue = !value;
        setValue(newValue);
        table.options.meta?.updateData(
          row.index,
          column.id as keyof Lesson,
          newValue,
        );
      };
      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);
      return (
        <Checkbox
          className="h-8 w-8"
          checked={value}
          onCheckedChange={onChange}
        />
      );
    },
  },
  {
    accessorKey: "contentType",
    header: "Content Type",
    cell: ({ getValue, row, column, table }) => {
      const initialValue = getValue<string>();
      const [value, setValue] = React.useState(initialValue);
      const [open, setOpen] = React.useState(false);
      const openAndSave = () => {
        if (open) {
          table.options.meta?.updateData(
            row.index,
            column.id as keyof Lesson,
            value,
          );
        }
        setOpen(!open);
      };
      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);
      return (
        <Select
          onValueChange={setValue}
          value={value}
          defaultValue={value}
          open={open}
          onOpenChange={openAndSave}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="select a value" />
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
    },
  },
  {
    accessorKey: "embedPassword",
    header: "Embed Password",
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue<string>() || "";
      const [value, setValue] = React.useState(initialValue);
      const onBlur = () =>
        table.options.meta?.updateData(index, id as keyof Lesson, value);
      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);
      return (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    },
  },
  {
    accessorKey: "embedUrl",
    header: "Embed URL",
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const initialValue = getValue<string>() || "";
      const [value, setValue] = React.useState(initialValue);
      const onBlur = () =>
        table.options.meta?.updateData(index, id as keyof Lesson, value);
      React.useEffect(() => {
        setValue(initialValue);
      }, [initialValue]);
      return (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    },
  },
];
