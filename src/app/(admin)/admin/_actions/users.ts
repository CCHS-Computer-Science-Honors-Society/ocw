"use server"; // don't forget to add this!

import { adminAction } from "@/server/api/actions";
import { updateUserInput } from "@/validators/users";
import { revalidateTag } from "next/cache";
import { user } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const updateUserAction = adminAction
  .schema(updateUserInput)
  .action(async ({ parsedInput }) => {
    await db.update(user).set(parsedInput).where(eq(user.id, parsedInput.id));
    revalidateTag("users");
  });

export const deleteUserAction = adminAction
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput }) => {
    await db.delete(user).where(eq(user.id, parsedInput.id));
    revalidateTag("users");
  });
