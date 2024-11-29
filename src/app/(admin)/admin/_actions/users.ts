import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";

export async function getUsers(page = 1, perPage = 10) {
  const offset = (page - 1) * perPage;
  const userList = await db.select().from(users).limit(perPage).offset(offset);
  const totalUsersResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(users);
  const totalCount = totalUsersResult[0]?.count ?? 0;

  return {
    users: userList,
    totalPages: Math.ceil(totalCount / perPage),
    currentPage: page,
  };
}

export async function updateUser(
  id: string,
  data: { name?: string; role?: "admin" | "user"; image?: string },
) {
  const session = await auth();

  if (session?.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await db.update(users).set(data).where(eq(users.id, id));
  return { success: true };
}
