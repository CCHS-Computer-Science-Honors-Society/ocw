import { db } from "@/server/db";
import { unstable_cache } from "next/cache";

export const getLesson = unstable_cache(
  (id: string) =>
    db.query.lessons.findFirst({
      where: (lessons, { eq }) => eq(lessons.id, id),
      columns: {
        id: true,
        title: true,
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
