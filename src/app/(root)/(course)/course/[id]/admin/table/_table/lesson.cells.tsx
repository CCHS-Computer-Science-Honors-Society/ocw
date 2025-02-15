import { ContentTypeEnum } from "@/server/db/schema";
import { CellContext } from "@tanstack/react-table";
import React from "react";
import { Lesson } from "./types";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";


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

const UnitSelectCell = (units: { label: string; value: string }[]) => {
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

export {
  NameCell,
  PublishedCell,
  UnitSelectCell,
  ContentTypeSelectCell,
  EmbedPasswordCell,
  EmbedUrlCell,
}
