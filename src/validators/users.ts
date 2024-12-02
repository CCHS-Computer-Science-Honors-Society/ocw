import { z } from "zod";

export const updateUserInput = z.object({
  id: z.string(),
  name: z.string().optional().nullish(),
  role: z.enum(["admin", "user"]).optional(),
  email: z.string().optional(),
  image: z.string().optional(),
});

export const deleteUserInput = z.object({
  id: z.string(),
});

export type UpdateUserData = z.infer<typeof updateUserInput>;
export type DeleteUser = z.infer<typeof deleteUserInput>;
