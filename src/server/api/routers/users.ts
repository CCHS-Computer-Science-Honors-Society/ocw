import { deleteUserInput, updateUserInput } from "@/validators/users";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { eq, or, desc, sql, and } from "drizzle-orm";
import { courses, courseUsers, user } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { insertLog } from "../actions/logs";
import { after } from "next/server";

export const usersRouter = createTRPCRouter({
  update: adminProcedure
    .input(updateUserInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(user).set(input).where(eq(user.id, input.id));
      after(async () => {
        await insertLog({
          userId: ctx.session.user.id,
          action: "UPDATE_USER",
        });
      });
      revalidatePath("/admin");
    }),
  delete: adminProcedure
    .input(deleteUserInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(user).where(eq(user.id, input.id));
      after(async () => {
        await insertLog({
          userId: ctx.session.user.id,
          action: "DELETE_USER",
        });
      });
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
        .from(user)
        .orderBy(desc(user.id))
        .limit(limit + 1)
        .where(cursor ? sql`${user.id} < ${cursor}` : undefined);

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

  getElevatedCourses: protectedProcedure
    .input(
      z.object({
        userId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = input.userId ?? ctx.session?.user.id;

      if (ctx.session.user.role === "admin") {
        return await ctx.db
          .select({
            name: courses.name,
            id: courses.id,
          })
          .from(courses);
      }
      return await ctx.db
        .select({
          id: courses.id,
          name: courses.name,
        })
        .from(courseUsers)
        .where(
          and(
            eq(courseUsers.userId, userId),
            or(eq(courseUsers.role, "admin"), eq(courseUsers.role, "editor")),
          ),
        )
        .innerJoin(user, eq(user.id, courseUsers.userId));
    }),
});
