import React from "react";
import { UsersTable } from "./_components/users-table";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { CreateCoursePopup } from "./_components/courses";
import { unstable_cache } from "next/cache";

const getData = unstable_cache(
  async () => {
    const usersData = await db.select().from(users);
    return { users: usersData };
  },
  ["users"],
  {
    revalidate: false,
  },
);

export default async function Page() {
  const data = await getData();

  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">User and Course Management</h1>
      <CreateCoursePopup />
      <UsersTable users={data.users} />
    </main>
  );
}
