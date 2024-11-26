/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUsers, updateUser } from "../_actions/users";
import { useActionState } from "react";

type User = {
  id: string;
  name: string | null;
  role: "admin" | "user";
  email: string;
  emailVerified: Date | null;
  image: string | null;
};

type UsersState = {
  users: User[];
  totalPages: number;
  currentPage: number;
} | null;

type ActionPayload = [number, number?];

export function UserTable() {
  const [page, setPage] = useState(1);
  const { register, handleSubmit, setValue } = useForm();

  const [state, dispatch] = useActionState<UsersState, ActionPayload>(
    async (currentState, [page, perPage = 10]) => {
      return getUsers(page, perPage);
    },
    null,
  );

  const onSubmit = async (data: any, userId: string) => {
    await updateUser(userId, data);
    dispatch([page]);
  };

  if (!state) {
    dispatch([page]);
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.users.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell>
                <Input
                  defaultValue={user.name ?? ""}
                  {...register(`name-${user.id}`)}
                />
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  defaultValue={user.role}
                  onValueChange={(value) => setValue(`role-${user.id}`, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Input
                  defaultValue={user.image ?? ""}
                  {...register(`image-${user.id}`)}
                />
              </TableCell>
              <TableCell>
                <Button
                  onClick={handleSubmit((data) =>
                    onSubmit(
                      {
                        name: data[`name-${user.id}`],
                        role: data[`role-${user.id}`],
                        image: data[`image-${user.id}`],
                      },
                      user.id,
                    ),
                  )}
                >
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            const newPage = Math.max(1, page - 1);
            setPage(newPage);
            dispatch([newPage]);
          }}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>
          Page {state.currentPage} of {state.totalPages}
        </span>
        <Button
          onClick={() => {
            const newPage = page + 1;
            setPage(newPage);
            dispatch([newPage]);
          }}
          disabled={page === state.totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
