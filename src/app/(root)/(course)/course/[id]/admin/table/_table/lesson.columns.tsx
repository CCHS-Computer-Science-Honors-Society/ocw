import { EditableCheckboxCell, EditableSelectCell, EditableTextCell } from "./cells";
import { type Lesson } from "./types";
import type { CellContext, ColumnDef } from "@tanstack/react-table";

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
      cell: (props) =>
        <EditableTextCell {...(props as CellContext<Lesson, string>)} />,

    },
    {
      accessorKey: "isPublished",
      header: "Published",
      cell: (props) =>
        <EditableCheckboxCell {...(props as CellContext<Lesson, boolean>)} />,
    },
    {
      accessorKey: "pureLink",
      header: "Pure Link",
      cell: (props) =>
        <EditableCheckboxCell {...(props as CellContext<Lesson, boolean>)} />,
    },
    {
      accessorKey: "contentType",
      header: "Content Type",
      cell: (props) =>
        <EditableSelectCell {...(props as CellContext<Lesson, string>)} options={[{
          label: "Google Docs",
          value: "google_docs",
        },
        {
          label: "Notion",
          value: "notion",

        },
        {
          label: "Quizlet",
          value: "quizlet",

        },
        {
          label: "TipTap",
          value: "tiptap",

        },
        ]} />,
    },
    {
      accessorKey: "unitId",
      header: "Unit",
      cell: (props) =>
        <EditableSelectCell {...(props as CellContext<Lesson, string>)} options={units} />,
    },
    {
      accessorKey: "embedPassword",
      header: "Embed Password",
      cell: (props) =>
        <EditableTextCell {...(props as CellContext<Lesson, string>)} />,
    },
    {
      accessorKey: "embedUrl",
      header: "Embed URL",
      cell: (props) =>
        <EditableTextCell {...(props as CellContext<Lesson, string>)} />,
    },
  ];
