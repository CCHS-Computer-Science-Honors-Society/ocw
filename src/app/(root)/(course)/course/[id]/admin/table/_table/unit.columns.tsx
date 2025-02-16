import { CellContext, ColumnDef } from "@tanstack/react-table";
import { Unit } from "./types";
import { EditableCheckboxCell, EditableTextCell } from "./cells";

export const getColumns = (): ColumnDef<Unit>[] => {
  return [
    {
      accessorKey: "id",
      header: "id",
    },
    {
      accessorKey: "name",
      header: "name",
      cell: (props) => (
        <EditableTextCell {...(props as CellContext<Unit, string>)} />
      ),
    },
    {
      accessorKey: "isPublished",
      header: "published",
      cell: (props) => (
        <EditableCheckboxCell {...(props as CellContext<Unit, boolean>)} />
      ),
    },
  ];
};
