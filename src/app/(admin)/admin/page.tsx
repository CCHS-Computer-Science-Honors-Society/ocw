import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { UsersTable } from "./_components/users-table";
import { CreateCoursePopup } from "./_components/courses";
import { api, HydrateClient } from "@/trpc/server";
import { getSession } from "@/server/auth/auth.server";

export default async function Page() {
  const session = await getSession();
  if (session?.user.role != "admin") {
    redirect("/");
  }
  void api.users.getUsers.prefetchInfinite({});

  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">User and Course Management</h1>
      <CreateCoursePopup />
      <HydrateClient>
        <Suspense fallback={<div>Loading...</div>}>
          <UsersTable />
        </Suspense>
      </HydrateClient>
    </main>
  );
}
