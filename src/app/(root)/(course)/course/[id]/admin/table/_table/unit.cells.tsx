import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { type CellContext } from "@tanstack/react-table";
import React from "react";
import { type Unit } from "./types";

const NameCell = ({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<Unit, string>): JSX.Element => {
  const initialValue = getValue<string>();
  const [value, setValue] = React.useState(initialValue);
  const onBlur = () =>
    table.options.meta?.updateData(index, id as keyof Unit, value);
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
}: CellContext<Unit, string>): JSX.Element => {
  const initialValue = getValue<boolean>();
  const [value, setValue] = React.useState(initialValue);
  const onChange = () => {
    const newValue = !value;
    setValue(newValue);
    table.options.meta?.updateData(index, id as keyof Unit, newValue);
  };
  React.useEffect(() => setValue(initialValue), [initialValue]);
  return (
    <Checkbox className="h-8 w-8" checked={value} onCheckedChange={onChange} />
  );
};

export { NameCell, PublishedCell };
