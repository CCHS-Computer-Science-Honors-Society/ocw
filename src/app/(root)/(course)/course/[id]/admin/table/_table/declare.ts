import { type RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: <Key extends keyof TData>(
      rowIndex: number,
      columnId: Key,
      value: unknown,
    ) => void;
  }
}
