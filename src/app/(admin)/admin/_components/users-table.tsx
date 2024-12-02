/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import * as React from "react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Trash2,
  Pencil,
  Check,
  X,
  Loader2,
  Copy,
} from "lucide-react";
import { updateUserAction, deleteUserAction } from "../_actions/users";
import type { User } from "../types";
import { toast } from "sonner";
import type { UpdateUserData } from "@/validators/users";
interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users: initialUsers }: UsersTableProps) {
  const router = useRouter();
  const { execute: update } = useAction(updateUserAction);
  const { execute: deleteUser } = useAction(deleteUserAction);

  const [users, setUsers] = React.useState(initialUsers);
  const [loading, setLoading] = React.useState<string | null>(null);
  const [editing, setEditing] = React.useState<string | null>(null);
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Email Copied");
    } catch (err) {
      toast.error(`Error Coping Email: ${err}`);
    }
  };

  const handleUpdate = async (
    user: User,
    field: keyof UpdateUserData,
    value: string,
  ) => {
    if (value === user[field]) {
      setEditing(null);
      return;
    }

    setLoading(`${user.id}-${field}`);
    update({
      id: user.id,
      [field]: value,
    });
    router.refresh();

    setLoading(null);
    setEditing(null);
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setLoading(userId);
      deleteUser({
        id: userId,
      });
      setLoading(null);
      router.refresh();
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Email Verified</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user.image ?? undefined}
                    alt={user.name ?? "User avatar"}
                  />
                  <AvatarFallback>
                    {user.name?.charAt(0) ?? user.email.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {editing === `${user.id}-name` ? (
                  <div className="flex items-center">
                    <Input
                      className="h-8 w-40"
                      defaultValue={user.name ?? ""}
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          void handleUpdate(
                            user,
                            "name",
                            e.currentTarget.value,
                          );
                        } else if (e.key === "Escape") {
                          setEditing(null);
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        handleUpdate(
                          user,
                          "name",
                          document.querySelector(
                            `input[name="${user.id}-name"]`,
                          )!.value,
                        )
                      }
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditing(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditing(`${user.id}-name`)}
                    className="flex items-center hover:underline"
                  >
                    {loading === `${user.id}-name` ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        {user.name ?? "Unnamed"}
                        <Pencil className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "h-8 w-24 justify-start",
                      user.role === "admin" ? "text-blue-600" : "",
                    )}
                  >
                    {loading === `${user.id}-role` ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        {user.role}
                        <ChevronDown className="ml-auto h-4 w-4" />
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    onClick={() => handleUpdate(user, "role", "user")}
                  >
                    user
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleUpdate(user, "role", "admin")}
                  >
                    admin
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
            <TableCell>
              {editing === `${user.id}-email` ? (
                <div className="flex items-center">
                  <Input
                    className="h-8 w-40"
                    defaultValue={user.email}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        void handleUpdate(user, "email", e.currentTarget.value);
                      } else if (e.key === "Escape") {
                        setEditing(null);
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      handleUpdate(
                        user,
                        "email",
                        document.querySelector(
                          `input[name="${user.id}-email"]`,
                        )!.value,
                      )
                    }
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditing(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <button
                  className="flex items-center hover:underline"
                  onClick={() => handleCopy(user.email)}
                >
                  {loading === `${user.id}-email` ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      {user.email}
                      <Copy className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(user.id)}
                disabled={loading === user.id}
              >
                {loading === user.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 text-red-500" />
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
