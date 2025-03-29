"use client";
import { useSortable } from "@dnd-kit/sortable";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { type ColumnDef } from "@tanstack/react-table";
import { GripVerticalIcon, MoreVerticalIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";

// Define the Zod schema for a Unit based on your data structure
export const unitSchema = z.object({
  id: z.string(),
  name: z.string(),
  courseId: z.string(),
  isPublished: z.boolean(),
  // Add position if you implement reordering
  // position: z.number(),
});

// Type alias for the data item
export type Unit = z.infer<typeof unitSchema>;

// --- DragHandle Component ---
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 cursor-grab text-muted-foreground hover:bg-transparent active:cursor-grabbing"
    >
      <GripVerticalIcon className="size-4 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

// --- Define Columns ---
export const columns: ColumnDef<Unit>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
    size: 40,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      const [value, setValue] = React.useState(row.original.name);
      const isPending =
        meta?.getCellUpdatePending(row.original.id, "name") ?? false;

      React.useEffect(() => {
        setValue(row.original.name);
      }, [row.original.name]);

      const onBlur = () => {
        if (value !== row.original.name) {
          if (meta?.updateCell) {
            meta.updateCell(row.original.id, "name", value);
          }
        }
      };

      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onBlur();
        (e.target as HTMLFormElement).querySelector("input")?.blur();
      };

      return (
        <form onSubmit={onSubmit}>
          <Label htmlFor={`${row.original.id}-name`} className="sr-only">
            Name
          </Label>
          <Input
            id={`${row.original.id}-name`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            disabled={isPending}
            className={`h-8 w-full min-w-40 border-transparent bg-transparent shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background ${
              isPending ? "cursor-not-allowed opacity-50" : ""
            }`}
          />
        </form>
      );
    },
    size: 350, // Adjusted size
  },
  {
    accessorKey: "isPublished",
    header: () => <div className="text-center">Published</div>,
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      if (!meta?.getCellUpdatePending) {
        console.log("No pending update function");
        return <div>No pending update function</div>; // Add a fallback UI
      }
      const isPending = meta.getCellUpdatePending(
        row.original.id,
        "isPublished",
      );

      const handleCheckedChange = (checked: boolean) => {
        if (!meta?.updateCell) return;
        meta.updateCell(row.original.id, "isPublished", checked);
      };

      return (
        <div className="flex justify-center">
          <Switch
            id={`${row.original.id}-isPublished`}
            checked={row.original.isPublished}
            onCheckedChange={handleCheckedChange}
            disabled={isPending}
            aria-label="Toggle Published Status"
            className={`${isPending ? "cursor-not-allowed opacity-50" : ""}`}
          />
        </div>
      );
    },
    size: 100,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <MoreVerticalIcon className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            onClick={() => console.log("Edit action for:", row.original.id)}
          >
            Edit Details
          </DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={() => console.log("TODO: Delete action:", row.original.id)}
            // Add delete mutation trigger here
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 50,
  },
];
