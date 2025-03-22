import RenderLesson from "@/components/render";
import { getLesson } from "@/server/api/scripts/lessons";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
    unitId: string;
    lessonId: string;
  }>;
}) {
  const { lessonId, id } = await params;

  const lesson = await getLesson(lessonId);

  if (!lesson) {
    return notFound();
  }

  if (lesson.pureLink) {
    if (lesson.embedId) {
      redirect(lesson.embedId);
    }
  }

  return (
    <RenderLesson isDisplay lesson={lesson} courseId={id} session={null} />
  );
}
