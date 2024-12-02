import { courses } from "@/server/db/schema";
import { z } from "zod";
import { adminProcedure, courseProcedure, createTRPCRouter } from "../trpc";
import { eq } from "drizzle-orm";

export const courseRouter = createTRPCRouter({
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50),
        subjectId: z.string(),
        aliases: z.array(z.string()).nonempty("Please at least one item"),
        isPublic: z.boolean(),
        description: z.string().min(1).max(500),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(courses).values(input);
    }),
  update: courseProcedure
    .input(
      z.object({
        courseId: z.string(),
        required: z.enum(["admin", "editor", "user"]),
        content: z.object({
          name: z.string().min(1).max(50).optional(),
          subjectId: z.string().optional(),
          aliases: z.array(z.string()).nonempty("Please at least one item").optional(),
          isPublic: z.boolean().optional(),
          description: z.string().min(1).max(500).optional(),
        })
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.update(courses).set(input.content).where(eq(courses.id, input.courseId))
    }),
});
