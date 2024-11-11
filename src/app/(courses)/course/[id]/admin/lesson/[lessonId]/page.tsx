import RenderLesson from "@/components/render";
import Editor from "@/editor";
import { getLesson } from "@/server/api/scripts/lessons";
import { auth } from "@/server/auth";

export default async function Page({
  params,
}: {
  params: Promise<{
    lessonId: string;
    id: string;
  }>;
}) {
  const { lessonId, id } = await params;
  const [lesson, session] = await Promise.all([getLesson(lessonId), auth()]);

  return (
    <RenderLesson
      lesson={lesson}
      courseId={id}
      session={session}
      isDisplay={false}
    />
  );
}
