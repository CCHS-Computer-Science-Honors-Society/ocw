import { lessons } from "@/server/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const updateLesson = z.object({
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
});

export const updateLessonFormSchema = updateLesson.omit({
  id: true,
  courseId: true,
});

export const createLesson = createInsertSchema(lessons)
  .extend({
    embed: z.object({
      password: z.string().optional(),
      embedUrl: z.string().url(),
    }),
  })
  .omit({
    content: true,
  });

export type CreateLesson = z.infer<typeof createLesson>;

export const createLessonFormSchema = createLesson.omit({
  courseId: true,
  id: true,
  order: true,
});
