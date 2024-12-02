import { deleteUserInput, updateUserInput } from "@/validators/users";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { eq, desc, sql } from "drizzle-orm";
import { users } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
  getUsers: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullable().default(null),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;

      const items = await ctx.db
        .select()
        .from(users)
        .orderBy(desc(users.id))
        .limit(limit + 1)
        .where(cursor ? sql`${users.id} < ${cursor}` : undefined);

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem?.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
});
