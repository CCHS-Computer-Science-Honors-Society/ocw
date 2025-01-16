import { cache } from "@/lib/cache";
import { db } from "@/server/db";
import { lessonEmbed, lessons } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const getLesson = cache(
  async (id: string) => {
    const [lesson] = await db
      .select({
        id: lessons.id,
        name: lessons.name,
        embedId: lessonEmbed.embedUrl,
        contentType: lessons.contentType,
        isPublished: lessons.isPublished,
        quizletPassword: lessonEmbed.password,
        content: lessons.content,
      })
      .from(lessons)
      .where(eq(lessons.id, id))
      .leftJoin(lessonEmbed, eq(lessonEmbed.lessonId, lessons.id));

    return lesson;
  },
  ["lesson"],
  {
    revalidate: 60 * 60 * 24,
  },
);

export type Lesson = Awaited<ReturnType<typeof getLesson>>;
