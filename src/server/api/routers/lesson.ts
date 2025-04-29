/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { asc, eq, and, max } from "drizzle-orm";
import {
  createPermissionCheckMiddleware,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";
import { z } from "zod";
import { lessons, lessonEmbed } from "@/server/db/schema";
import { insertLog } from "../actions/logs";
import { TRPCError } from "@trpc/server";
import { after } from "next/server";
import { createLesson, updateLesson } from "@/validators/lesson";
import { callInvalidate } from "@/lib/cache/callInvalidate";

export const lessonRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createLesson)
    .use(createPermissionCheckMiddleware("create_lesson"))
    .mutation(async ({ ctx, input }) => {
      const [highestOrder] = await ctx.db
        .select({ maxOrder: max(lessons.order) })
        .from(lessons)
        .where(eq(lessons.unitId, input.unitId));

      const { embed, ...lesson } = input;
      const [returnedlessons] = await ctx.db
        .insert(lessons)
        .values({
          ...lesson,
          order: (highestOrder?.maxOrder ?? 0) + 1,
        })
        .returning();

      const lessonId = returnedlessons?.id;
      if (!lessonId) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create lesson",
        });
      }

      await ctx.db.insert(lessonEmbed).values({
        ...embed,
        lessonId,
      });

      callInvalidate(input.courseId, input.unitId, lessonId);
      after(async () => {
        await insertLog({
          userId: ctx.session?.user.id,
          action: "CREATE_LESSON",
          courseId: input.courseId,
          lessonId,
        });
      });

      return lesson;
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
    .use(createPermissionCheckMiddleware("edit_lesson"))
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

      callInvalidate(input.courseId, input.unitId, input.data[0]?.id);
      after(async () => {
        await insertLog({
          action: "REORDER_LESSON",
          userId: ctx.session.user.id,
          courseId: input.courseId,
        });
      });
    }),
  update: protectedProcedure
    .input(updateLesson)
    .use(createPermissionCheckMiddleware("edit_lesson"))
    .mutation(async ({ ctx, input }) => {
      const { embed, id, courseId, ...otherLessonData } = input;

      const lessonFieldsToUpdate = Object.keys(otherLessonData);
      const hasLessonUpdates = lessonFieldsToUpdate.length > 0;

      const embedFieldsToUpdate = embed ? Object.keys(embed) : [];
      const hasEmbedUpdates = embed && embedFieldsToUpdate.length > 0;

      if (!hasLessonUpdates && !hasEmbedUpdates) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No fields provided to update.",
        });
      }

      const updatedLessonData = await ctx.db.transaction(async (tx) => {
        let lessonUpdateResult: any[] = [];

        if (hasLessonUpdates) {
          lessonUpdateResult = await tx
            .update(lessons)
            .set(otherLessonData)
            .where(eq(lessons.id, id))
            .returning();

          if (lessonUpdateResult.length === 0) {
            tx.rollback();
            throw new TRPCError({
              code: "NOT_FOUND",
              message: `Lesson with id ${id} not found for update.`,
            });
          }
        }

        if (hasEmbedUpdates) {
          const embedUpdateResult = await tx
            .update(lessonEmbed)
            .set(embed)
            .where(eq(lessonEmbed.lessonId, id))
            .returning({ updatedId: lessonEmbed.id });

          if (embedUpdateResult.length === 0) {
            console.warn(
              `No lessonEmbed record found for lessonId ${id} during update.`,
            );
          }
        }

        if (lessonUpdateResult.length > 0) {
          return lessonUpdateResult[0];
        } else {
          const finalLesson = await tx.query.lessons.findFirst({
            where: eq(lessons.id, id),
          });
          if (!finalLesson) {
            tx.rollback();
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: `Failed to retrieve lesson ${id} after embed update.`,
            });
          }
          return finalLesson;
        }
      });

      // Invalidate cache and log after successful transaction
      callInvalidate(courseId, input.unitId, id);
      after(async () => {
        await insertLog({
          userId: ctx.session.user.id,
          action: "UPDATE_LESSON",
          lessonId: id, // Use id from input
          courseId: courseId, // Use courseId from input
        });
      });

      // Return the final updated lesson data
      return updatedLessonData;
    }),
  getTableData: protectedProcedure
    .input(
      z.object({
        courseId: z.string(),
        unitId: z.string().optional(),
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
        .leftJoin(
          lessonEmbed,
          and(
            eq(lessons.id, lessonEmbed.lessonId),
            input.unitId ? eq(lessons.unitId, input.unitId) : undefined,
          ),
        )
        .where(eq(lessons.courseId, input.courseId));
      return data;
    }),
});
