import { deleteUserInput, updateUserInput } from "@/validators/users";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { eq } from "drizzle-orm";
import { users } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

export const usersRouter = createTRPCRouter({
  update: adminProcedure
    .input(updateUserInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(users).set(input).where(eq(users.id, input.id));
      revalidatePath("/admin");
    }),
  delete: adminProcedure
    .input(deleteUserInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(users).where(eq(users.id, input.id));
      revalidatePath("/admin");
    }),
});
