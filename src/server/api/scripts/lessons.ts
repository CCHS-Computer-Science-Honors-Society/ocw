import { db } from "@/server/db";
import { unstable_cache } from "next/cache";

export const getLesson = unstable_cache(
  (id: string) =>
    db.query.lessons.findFirst({
      where: (lessons, { eq, and }) =>
        and(eq(lessons.id, id), eq(lessons.isPublished, true)),
      columns: {
        id: true,
        name: true,
        embedId: true,
        contentType: true,
        description: true,
        quizletPassword: true,
        content: true,
      },
    }),
  ["lesson"],
);

export type Lesson = Awaited<ReturnType<typeof getLesson>>;
