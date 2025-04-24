import { useSortable } from "@dnd-kit/sortable";
import { Checkbox } from "@radix-ui/react-checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { type ColumnDef } from "@tanstack/react-table";
import { GripVerticalIcon, MoreVerticalIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { type DataItem } from ".";
import { Label } from "@/components/ui/label";
import { contentTypeMap } from "@/validators/lesson";
import Link from "next/link";
import { z } from "zod";
import { toast } from "sonner";

const url = z.string().url();

function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 cursor-grab hover:bg-transparent active:cursor-grabbing"
    >
      <GripVerticalIcon className="text-muted-foreground size-4" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

// 3. Define Columns
// (Columns definition remains the same as your provided code)
// ... (Keep the columns array exactly as you provided it) ...
export const columns: ColumnDef<DataItem>[] = [
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
      if (!meta?.getCellUpdatePending) {
        console.log("No pending update function");
        return <div>No pending update function</div>; // Add a fallback UI
      }
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
            className={`hover:bg-input/30 focus-visible:bg-background h-8 w-full min-w-40 border-transparent bg-transparent shadow-none focus-visible:border ${
              isPending ? "cursor-not-allowed opacity-50" : ""
            }`}
          />
        </form>
      );
    },
    size: 250,
  },
  {
    accessorKey: "unitId",
    header: "Unit",
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      const units = meta?.units;
      if (!meta?.getCellUpdatePending) {
        console.log("No pending update function");
        return <div>No pending update function</div>; // Add a fallback UI
      }
      if (!units) {
        return <div>No units found</div>; // Add a fallback UI
      }
      if (!meta?.updateCell) {
        console.log("No update cell function");
        return <div>No update cell function</div>; // Add a fallback UI
      }

      const isPending = meta.getCellUpdatePending(row.original.id, "unitId");

      const handleValueChange = (newValue: string) => {
        if (newValue !== row.original.unitId) {
          if (!meta?.updateCell) return;
          console.log("newValue", newValue);
          meta.updateCell(row.original.id, "unitId", newValue);
        }
      };

      return (
        <>
          <Label htmlFor={`${row.original.id}-unitId`} className="sr-only">
            Unit
          </Label>
          <Select
            value={row.original.unitId}
            onValueChange={handleValueChange}
            disabled={isPending}
          >
            <SelectTrigger
              className={`h-8 w-48 ${
                isPending ? "cursor-not-allowed opacity-50" : ""
              }`}
              id={`${row.original.id}-unitId`}
            >
              <SelectValue placeholder="Select unit..." />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit.value} value={unit.value}>
                  {unit.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      );
    },
    size: 200,
  },
  {
    accessorKey: "contentType",
    header: "Content Type",
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      if (!meta?.getCellUpdatePending) {
        console.log("No pending update function");
        return <div>No pending update function</div>; // Add a fallback UI
      }
      if (!meta?.updateCell) {
        console.log("No update cell function");
        return <div>No update cell function</div>; // Add a fallback UI
      }

      const isPending = meta.getCellUpdatePending(
        row.original.id,
        "contentType",
      );

      const handleValueChange = (newValue: string) => {
        if (newValue !== row.original.contentType) {
          if (!meta?.updateCell) return;
          console.log("newValue", newValue);
          meta.updateCell(row.original.id, "contentType", newValue);
        }
      };

      return (
        <>
          <Label htmlFor={`${row.original.id}-contentType`} className="sr-only">
            Content Type
          </Label>
          <Select
            value={row.original.contentType}
            onValueChange={handleValueChange}
            disabled={isPending}
          >
            <SelectTrigger
              className={`h-8 w-48 ${
                isPending ? "cursor-not-allowed opacity-50" : ""
              }`}
              id={`${row.original.id}-contentType`}
            >
              <SelectValue placeholder="Select content type..." />
            </SelectTrigger>
            <SelectContent>
              {contentTypeMap.map((contentType) => (
                <SelectItem key={contentType.value} value={contentType.value}>
                  {contentType.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      );
    },
    size: 150,
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
    accessorKey: "pureLink",
    header: () => <div className="text-center">Pure Link</div>,
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      if (!meta?.getCellUpdatePending) {
        console.log("No pending update function");
        return <div>No pending update function</div>; // Add a fallback UI
      }
      const isPending = meta.getCellUpdatePending(row.original.id, "pureLink");

      const handleCheckedChange = (checked: boolean) => {
        if (!meta?.updateCell) return;

        meta.updateCell(row.original.id, "pureLink", checked);
      };

      return (
        <div className="flex justify-center">
          <Switch
            id={`${row.original.id}-pureLink`}
            checked={row.original.pureLink}
            onCheckedChange={handleCheckedChange}
            disabled={isPending}
            aria-label="Toggle Pure Link Status"
            className={`${isPending ? "cursor-not-allowed opacity-50" : ""}`}
          />
        </div>
      );
    },
    size: 100,
  },
  {
    accessorKey: "embedUrl",
    header: "Resource URL",
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      const [value, setValue] = React.useState(row.original.embedUrl);
      if (!meta?.getCellUpdatePending) {
        console.log("No pending update function");
        return <div>No pending update function</div>; // Add a fallback UI
      }
      const isPending =
        meta?.getCellUpdatePending(row.original.id, "embedUrl") ?? false;

      React.useEffect(() => {
        setValue(row.original.embedUrl);
      }, [row.original.embedUrl]);

      const onBlur = () => {
        if (value !== row.original.embedUrl) return;
        if (!meta?.updateCell) return;
        const data = url.safeParse(value);
        if (!data.success) return toast.error("Enter a valid url.");
        if (row.original.embedPassword === value) return;
        meta.updateCell(row.original.id, "embedUrl", data.data);
      };

      const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onBlur();
        (e.target as HTMLFormElement).querySelector("input")?.blur();
      };

      return (
        <form onSubmit={onSubmit}>
          <Label htmlFor={`${row.original.id}-embedUrl`} className="sr-only">
            Embed Url
          </Label>
          <Input
            id={`${row.original.id}-embedUrl`}
            value={value ?? ""}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            disabled={isPending}
            className={`hover:bg-input/30 focus-visible:bg-background h-8 w-full min-w-40 border-transparent bg-transparent shadow-none focus-visible:border ${
              isPending ? "cursor-not-allowed opacity-50" : ""
            }`}
          />
        </form>
      );
    },
    size: 250,
  },
  {
    id: "actions",
    cell: ({ row, table }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-muted-foreground data-[state=open]:bg-muted flex size-8"
            size="icon"
          >
            <MoreVerticalIcon className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem asChild>
            <Link
              href={`/dashboard/${table.options.meta?.courseId}/lesson/${row.original.id}/`}
            >
              Edit Details
            </Link>
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
