//given a link to /lesson/[id] we will redirect the user to the actual lesson in the course
import { redirect, notFound } from "next/navigation";
import { hard_cache } from "@/lib/cache";
import { db } from "@/server/db";

const getMinimalLesson = hard_cache(
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
    return notFound();
  }
  return redirect(
    `/course/${lesson.unit.course.id}/${lesson.unit.id}/${lesson.id}`,
  );
}
