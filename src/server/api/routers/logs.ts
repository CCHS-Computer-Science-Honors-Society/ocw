import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { log } from "@/server/db/schema";
import { z } from "zod";

export const logRouter = createTRPCRouter({
  getLogs: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        limit: z.number().min(1).max(100).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.log.findMany({
        where: (course, { eq }) => eq(course.id, input.courseId),
      });
    }),
});
