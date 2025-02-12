import { asc, eq, max, sql } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { courses, lessons, units, lessonEmbed } from "@/server/db/schema";
import type { JSONContent } from "novel";
import { revalidateTag } from "next/cache";

export const lessonRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        courseId: z.string(),
        embedUrl: z.string().optional(),
        content: z.any().optional(),
        description: z.string(),
        unitId: z.string(),
        contentType: z
          .enum(["tiptap", "quizlet", "notion", "google_docs"])
          .default("tiptap"),
        password: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        title,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        content,
        unitId,
        embedUrl,
        courseId,
        contentType,
        password,
      } = input;

      const highestOrder = await ctx.db
        .select({ maxOrder: max(lessons.order) })
        .from(lessons)
        .where(eq(lessons.unitId, unitId));

      const newOrder = (highestOrder[0]?.maxOrder ?? 0) + 1;

      const c = content as JSONContent;

      await ctx.db.transaction(async (tx) => {
        const [insertedLesson] = await tx
          .insert(lessons)
          .values({
            contentType,
            unitId,
            courseId,
            isPublished: false,
            order: newOrder,
            content: c,
            name: title,
          })
          .returning({ id: lessons.id });

        if (contentType !== "tiptap" && embedUrl) {
          await tx.insert(lessonEmbed).values({
            lessonId: insertedLesson!.id,
            embedUrl,
            password,
          });
        }
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

      const highestOrder = await ctx.db
        .select({ maxOrder: max(units.order) })
        .from(units)
        .where(eq(units.courseId, courseId));

      const newOrder = (highestOrder[0]?.maxOrder ?? 0) + 1;

      await ctx.db.insert(units).values({
        name,
        description,
        courseId,
        order: input.position ?? newOrder,
      });

      await ctx.db
        .update(courses)
        .set({
          unitLength: sql`${courses.unitLength} + 1`,
        })
        .where(eq(courses.id, courseId));

      revalidateTag("getCourseById");
    }),

  getLessonsForDashboard: publicProcedure
    .input(z.object({ unitId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.lessons.findMany({
        columns: {
          id: true,
          name: true,
          order: true,
          isPublished: true,
        },
        where: eq(lessons.unitId, input.unitId),
        orderBy: asc(lessons.order),
      });
    }),

  reorder: protectedProcedure
    .input(
      z.object({
        unitId: z.string(),
        data: z.array(
          z.object({
            id: z.string(),
            position: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        const updates = input.data.map((item) =>
          tx
            .update(lessons)
            .set({ order: item.position })
            .where(eq(lessons.id, item.id)),
        );

        await Promise.all(updates);
      });
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        unitId: z.string().optional(),
        name: z.string().optional(),
        isPublished: z.boolean().optional(),
        pureLink: z.boolean().optional(),
        embed: z
          .object({
            password: z.string().optional(),
            embedUrl: z.string().optional(),
          })
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const data = input;
      const { id, embed } = data;
      await ctx.db.transaction(async (tx) => {
        await tx
          .update(lessons)
          .set({
            name: data.name,
            isPublished: data.isPublished,
            pureLink: data.pureLink,
            unitId: data.unitId,
          })
          .where(eq(lessons.id, id));
        if (embed) {
          await tx
            .update(lessonEmbed)
            .set({
              password: embed.password,
              embedUrl: embed.embedUrl,
            })
            .where(eq(lessonEmbed.lessonId, id));
        }
      });
    }),

  getTableData: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db
        .select({
          id: lessons.id,
          name: lessons.name,
          unitId: lessons.unitId,
          contentType: lessons.contentType,
          isPublished: lessons.isPublished,
          pureLink: lessons.pureLink,
          embedPassword: lessonEmbed.password,
          embedUrl: lessonEmbed.embedUrl,
          embedId: lessonEmbed.id,
        })
        .from(lessons)
        .leftJoin(lessonEmbed, eq(lessons.id, lessonEmbed.lessonId))
        .where(eq(lessons.courseId, input.courseId));
      return data;
    }),
});
