import { getLesson } from "@/server/api/scripts/lessons";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
    unitId: string;
    lessonId: string;
  }>;
}) {
  const lessonId = (await params).lessonId;
  const lesson = await getLesson(lessonId);

  if (!lesson) {
    return notFound();
  }

  switch (lesson.contentType) {
    case "google_docs":
      return <div>google docs</div>;
    case "notion":
      return <div>notion</div>;
    case "quizlet":
      return <div>quizlet</div>;
    case "tiptap":
      return <div>tiptap</div>;
  }

  return <div>Unknown content type</div>;
}
