import { auth } from "@/server/auth";
import React from "react";
import UserTable from "./_components/users-table";

export default async function Layout() {
  const session = await auth();

  if (session?.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  return (
    <div>
      <UserTable />
    </div>
  );
}
