import { redirect, notFound } from "next/navigation";
import { cache, REVALIDATE_WEEK } from "@/lib/cache";
import { db } from "@/server/db";

const getMinimalLesson = cache(
  async (id: string) => {
    const lesson = await db.query.lessons.findFirst({
      where: (lessons, { eq }) => eq(lessons.id, id),
      columns: {
        id: true,
        pureLink: true,
      },
      with: {
        embeds: {
          columns: {
            embedUrl: true,
          }
        },
        unit: {
          columns: {
            id: true,
          },
          with: {
            course: {
              columns: {
                id: true,
              },
            },
          },
        },
      },
    });
    return lesson;
  },
  ["lessonRedirect"],
  {
    revalidate: REVALIDATE_WEEK,
  },
);

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const id = (await params).id;
  const lesson = await getMinimalLesson(id);

  if (!lesson) {
    console.log("Lesson not found");
    return notFound();
  }
  if (lesson.pureLink) {
    if (lesson.embeds.embedUrl) {
      return redirect(lesson.embeds.embedUrl);
    }
  }

  return redirect(
    `/course/${lesson.unit.course.id}/${lesson.unit.id}/${lesson.id}`,
  );
}
