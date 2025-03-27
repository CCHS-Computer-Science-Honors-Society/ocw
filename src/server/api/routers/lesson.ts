import { asc, eq, max } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { lessons, lessonEmbed } from "@/server/db/schema";
import { insertLog } from "../actions/logs";
import { TRPCError } from "@trpc/server";
import { after } from "next/server";
import { hasPermission } from "@/server/auth/plugin/permission/service";
import { createLesson, updateLesson } from "@/validators/lesson";
import { revalidatePath } from "next/cache";

export const lessonRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createLesson)
    .mutation(async ({ ctx, input }) => {
      if (
        !(await hasPermission({
          userId: ctx.session.user.id,
          courseId: input.courseId,
          permission: "create_lesson",
        }))
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have permission to create a lesson",
        });
      }

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

      revalidatePath(`/course/${input.courseId}/${input.unitId}/${lessonId}`);
      revalidatePath(`/course/${input.courseId}/`);

      after(async () => {
        await insertLog({
          userId: ctx.session.user.id,
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
    .mutation(async ({ ctx, input }) => {
      if (
        !(await hasPermission({
          userId: ctx.session.user.id,
          courseId: input.courseId,
          permission: "edit_lesson",
        }))
      ) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You do not have permission to create a unit",
        });
      }

      await ctx.db.transaction(async (tx) => {
        const updates = input.data.map((item) =>
          tx
            .update(lessons)
            .set({ order: item.position })
            .where(eq(lessons.id, item.id)),
        );
        await Promise.all(updates);
      });
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
    .mutation(async ({ ctx, input }) => {
      if (
        !(await hasPermission({
          userId: ctx.session.user.id,
          courseId: input.courseId,
          permission: "edit_lesson",
        }))
      ) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You do not have permission to edit this lesson",
        });
      }
      const { embed, ...lessonData } = input;
      const lesson = await ctx.db.transaction(async (tx) => {
        const lessonResult = await tx
          .update(lessons)
          .set({ ...lessonData })
          .where(eq(lessons.id, input.id))
          .returning();

        await tx
          .update(lessonEmbed)
          .set({
            ...embed,
          })
          .where(eq(lessonEmbed.lessonId, input.id))
          .returning();

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
      });
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
