import { redirect, notFound } from "next/navigation";
import { cache } from "@/lib/cache";
import { db } from "@/server/db";

const getMinimalLesson = cache(
  async (id: string) => {
    const lesson = await db.query.lessons.findFirst({
      where: (lessons, { eq }) => eq(lessons.id, id),
      columns: {
        id: true,
      },
      with: {
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
    revalidate: 60 * 60 * 24,
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
  return redirect(
    `/course/${lesson.unit.course.id}/${lesson.unit.id}/${lesson.id}`,
  );
}
