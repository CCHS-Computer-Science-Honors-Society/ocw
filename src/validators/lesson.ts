import { ContentTypeEnum, lessons } from "@/server/db/schema";
import { lt } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import Loadable from "next/dist/shared/lib/loadable.shared-runtime";
import { z } from "zod";

export const updateLesson = z.object({
  id: z.string(),
  courseId: z.string(),
  unitId: z.string().optional(),
  name: z.string().optional(),
  contentType: z.enum(ContentTypeEnum).optional(),
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
    order: true,
  });

export type CreateLesson = z.infer<typeof createLesson>;

export const createLessonFormSchema = createLesson.omit({
  courseId: true,
  id: true,
});

export type CreateLessonFormSchema = z.infer<typeof createLessonFormSchema>;

export const contentTypeMap = ContentTypeEnum.map((c) => ({
  label: c,
  value: c,
}));
