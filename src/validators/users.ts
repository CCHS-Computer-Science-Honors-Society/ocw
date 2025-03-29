import { user } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const updateUserInput = createInsertSchema(user).extend({
  id: z.string(),
});

export type UpdateUserData = z.infer<typeof updateUserInput>;

export const deleteUserInput = z.object({
  id: z.string(),
});

export type DeleteUser = z.infer<typeof deleteUserInput>;
