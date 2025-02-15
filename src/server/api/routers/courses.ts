import { courses, lessons, units } from "@/server/db/schema";
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
          aliases: z
            .array(z.string())
            .nonempty("Please at least one item")
            .optional(),
          isPublic: z.boolean().optional(),
          description: z.string().min(1).max(500).optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(courses)
        .set(input.content)
        .where(eq(courses.id, input.courseId));
    }),
  getBreadcrumbData: courseProcedure
    .input(
      z.object({
        courseId: z.string(),
        unitId: z.string().optional(),
        lessonId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { courseId, unitId, lessonId } = input;

      const [course, unit, lesson] = await Promise.all([
        ctx.db.query.courses.findFirst({
          where: eq(courses.id, courseId),
          columns: { id: true, name: true },
        }),
        unitId
          ? ctx.db.query.units.findFirst({
              where: eq(units.id, unitId),
              columns: { id: true, name: true },
            })
          : Promise.resolve(undefined),
        lessonId
          ? ctx.db.query.lessons.findFirst({
              where: eq(lessons.id, lessonId),
              columns: { id: true, name: true },
            })
          : Promise.resolve(undefined),
      ]);

      const breadcrumbs: { id: string; name: string }[] = [];
      if (course) breadcrumbs.push({ id: course.id, name: course.name });
      if (unit) breadcrumbs.push({ id: unit.id, name: unit.name });
      if (lesson) breadcrumbs.push({ id: lesson.id, name: lesson.name });

      return breadcrumbs;
    }),
});
