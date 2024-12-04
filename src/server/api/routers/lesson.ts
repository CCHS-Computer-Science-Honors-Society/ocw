import { asc, eq, max, sql } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { courses, lessons, units } from "@/server/db/schema";
import type { JSONContent } from "novel";
import { revalidateTag } from "next/cache";

export const lessonRouter = createTRPCRouter({
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        content: z.any().optional(),
        contentType: z
          .enum(["tiptap", "quizlet", "notion", "google_docs"])
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      try {
        await ctx.db
          .update(lessons)
          .set({
            title: input.title,
            description: input.description,
            content: input.content as JSONContent,
            contentType: input.contentType,
          })
          .where(eq(lessons.id, id));
      } catch (e) {
        console.log(e);
      }

      revalidateTag("lesson");
      revalidateTag("getCourseById");
    }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        embedId: z.string().optional(),
        content: z.any().optional(),
        description: z.string(),
        unitId: z.string(),
        contentType: z
          .enum(["tiptap", "quizlet", "notion", "google_docs"])
          .default("tiptap"),
        position: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const {
        title,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        content,
        description,
        unitId,
        embedId,
        position,
        contentType,
      } = input;

      const c = content as JSONContent;
      await ctx.db.insert(lessons).values({
        contentType,
        description,
        position,
        unitId,
        content: c,
        embedId,
        title,
      });

      revalidateTag("getCourseById");
    }),

  createUnit: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().min(1, "Description is required"),
        courseId: z.string(),
        position: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, description, courseId } = input;

      // Get the highest order value for the given course
      const highestOrder = await ctx.db
        .select({ maxOrder: max(units.order) })
        .from(units)
        .where(eq(units.courseId, courseId));

      // Calculate the new order (increment by 1 or start at 1 if no units exist)
      const newOrder = (highestOrder[0]?.maxOrder ?? 0) + 1;

      // Insert the new unit with the calculated order
      await ctx.db.insert(units).values({
        name,
        description,
        courseId,
        order: input.position ?? newOrder,
      });

      // Update the course's unit counter
      await ctx.db
        .update(courses)
        .set({
          unitLength: sql`${courses.unitLength} + 1`,
        })
        .where(eq(courses.id, courseId));

      revalidateTag("getCourseById");
    }),
  getLessonsForDashboard: publicProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.lessons.findMany({
        columns: {
          id: true,
          name: true,
          position: true,
          isPublished: true,
        },
        where: eq(units.courseId, input.courseId),
        orderBy: asc(units.order),
      });
    }),
});
