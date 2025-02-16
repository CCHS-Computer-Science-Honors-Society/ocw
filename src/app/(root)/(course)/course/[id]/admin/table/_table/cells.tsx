import type { CellContext } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const EditableTextCell = <T extends object>({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<T, string>): JSX.Element => {
  const initialValue = getValue() as string;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleBlur = () => {
    table.options.meta?.updateData(index, id as keyof T, value);
  };

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
    />
  );
};

export const EditableCheckboxCell = <T extends object>({
  getValue,
  row: { index },
  column: { id },
  table,
}: CellContext<T, boolean>): JSX.Element => {
  const initialValue = getValue() as boolean;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = () => {
    const newValue = !value;
    setValue(newValue);
    table.options.meta?.updateData(index, id as keyof T, newValue);
  };

  return (
    <Checkbox
      className="h-8 w-8"
      checked={value}
      onCheckedChange={handleChange}
    />
  );
};

export const EditableSelectCell = <T extends object>({
  getValue,
  row,
  column,
  table,
  options,
}: CellContext<T, string> & {
  options: { label: string; value: string }[];
}) => {
  const initialValue = getValue() as string;
  const [value, setValue] = useState(initialValue);
  const [open, setOpen] = useState(false);

  function handleChange(value: string) {
    setValue(value);
    console.log(row.index, column.id as keyof T, value);
    table.options.meta?.updateData(row.index, column.id as keyof T, value);
  }

  useEffect(() => setValue(initialValue), [initialValue]);

  return (
    <Select
      onValueChange={handleChange}
      value={value}
      defaultValue={value}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="select a value" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option.value} key={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
