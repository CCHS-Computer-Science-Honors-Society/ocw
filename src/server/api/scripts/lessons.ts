import { hard_cache } from "@/lib/cache";
import { db } from "@/server/db";

export const getLesson = hard_cache(
  (id: string) =>
    db.query.lessons.findFirst({
      where: (lessons, { eq, and }) =>
        and(eq(lessons.id, id), eq(lessons.isPublished, true)),
      columns: {
        id: true,
        name: true,
        embedId: true,
        contentType: true,
        isPublished: true,
        quizletPassword: true,
        content: true,
      },
    }),
  ["lesson"],
  {
    revalidate: 60 * 60 * 24,
  },
);

export type Lesson = Awaited<ReturnType<typeof getLesson>>;
