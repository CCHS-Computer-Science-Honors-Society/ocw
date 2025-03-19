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
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleBlur = () => {
    if (value !== initialValue) {
      table.options.meta?.updateData(index, id as keyof T, value);
    }
  };

  return (
    <Input
      value={value ?? undefined}
      className="h-8 w-full border-transparent bg-transparent text-left shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background"
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
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = () => {
    const newValue = !value;
    setValue(newValue);

    if (newValue !== initialValue) {
      table.options.meta?.updateData(index, id as keyof T, newValue);
    }
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
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const [open, setOpen] = useState(false);

  function handleChange(value: string) {
    setValue(value);

    if (value !== initialValue) {
      console.log(row.index, column.id as keyof T, value);
      table.options.meta?.updateData(row.index, column.id as keyof T, value);
    }
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
      <SelectTrigger className="w-[280px] h-8 border-transparent bg-transparent text-left shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background">
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
