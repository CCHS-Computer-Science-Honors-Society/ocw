import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { lessons, units } from "@/server/db/schema";
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
        order: z.number().min(1, "Order is required"),
        courseId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name, description } = input;
      await ctx.db.insert(units).values({
        order: input.order,
        name,
        description,
        courseId: input.courseId,
      });

      revalidateTag("getCourseById");
    }),
});
