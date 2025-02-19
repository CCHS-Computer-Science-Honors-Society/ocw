import { asc, eq, max, sql } from "drizzle-orm";
import {
  courseProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";
import { z } from "zod";
import { courses, lessons, units, lessonEmbed } from "@/server/db/schema";
import type { JSONContent } from "novel";
import { revalidateTag } from "next/cache";
import { insertLog } from "../actions/logs";
import { TRPCError } from "@trpc/server";
import { after } from "next/server";

export const lessonRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        courseId: z.string(),
        embedUrl: z.string().optional(),
        content: z.any().optional(),
        description: z.string(),
        unitId: z.string(), contentType: z
          .enum(["tiptap", "quizlet", "notion", "google_docs"])
          .default("tiptap"),
        password: z.string().optional(),
      }),
    )
    .use(courseProcedure)
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

      const lessonId = await ctx.db.transaction(async (tx) => {
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
        return insertedLesson!.id;
      });
      if (!lessonId) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create lesson",
        });
      }

      after(async () => {
        await insertLog({
          userId: ctx.session.user.id,
          action: "CREATE_LESSON",
          courseId: courseId,
          lessonId,
        });
      })

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
    .use(courseProcedure)
    .mutation(async ({ ctx, input }) => {
      const { name, description, courseId } = input;

      const highestOrder = await ctx.db
        .select({ maxOrder: max(units.order) })
        .from(units)
        .where(eq(units.courseId, courseId));

      const newOrder = (highestOrder[0]?.maxOrder ?? 0) + 1;

      const unit = await ctx.db
        .insert(units)
        .values({
          name,
          description,
          courseId,
          order: input.position ?? newOrder,
        })
        .returning();

      await ctx.db
        .update(courses)
        .set({
          unitLength: sql`${courses.unitLength} + 1`,
        })
        .where(eq(courses.id, courseId));

      if (!unit[0]?.id) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create unit",
        });
      }

      after(async () => {
        await insertLog({
          userId: ctx.session.user.id,
          action: "CREATE_UNIT",
          id: unit[0]?.id,
          courseId,
        });
      })
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
        courseId: z.string(),
        data: z.array(
          z.object({
            id: z.string(),
            position: z.number(),
          }),
        ),
      }),
    )
    .use(courseProcedure)
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
        courseId: z.string(),
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
      }),
    )
    .use(courseProcedure)
    .mutation(async ({ ctx, input }) => {
      const lesson = await ctx.db.transaction(async (tx) => {
        // build update object for lesson
        const updateData: Record<string, unknown> = {};
        if (input.name !== undefined) updateData.name = input.name;
        if (input.isPublished !== undefined)
          updateData.isPublished = input.isPublished;
        if (input.pureLink !== undefined) updateData.pureLink = input.pureLink;
        if (input.unitId !== undefined) updateData.unitId = input.unitId;

        // update & verify lesson exists in one query
        const lessonResult = await tx
          .update(lessons)
          .set(updateData)
          .where(eq(lessons.id, input.id))
          .returning({ id: lessons.id, courseId: lessons.courseId });

        if (!lessonResult.length) {
          throw new Error(`lesson with id ${input.id} not found`);
        }

        // if embed update provided, perform it at once inside tx
        if (input.embed) {
          const embedData: Record<string, unknown> = {};
          if (input.embed.password !== undefined)
            embedData.password = input.embed.password;
          if (input.embed.embedUrl !== undefined)
            embedData.embedUrl = input.embed.embedUrl;

          const embedResult = await tx
            .update(lessonEmbed)
            .set(embedData)
            .where(eq(lessonEmbed.lessonId, input.id))
            .returning({ id: lessonEmbed.id });
          if (!embedResult.length) {
            throw new Error(`embed for lesson ${input.id} not found`);
          }
        }
        return lessonResult[0];
      });
      if (!lesson?.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `lesson with id ${input.id} not found`,
        });
      }
      after(async () => {
        await insertLog({
          userId: ctx.session.user.id,
          action: "UPDATE_LESSON",
          lessonId: lesson.id,
          courseId: lesson.courseId,
        });
      })

    }),

  getTableData: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
      }),
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
