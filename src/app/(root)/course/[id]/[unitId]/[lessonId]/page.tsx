import { getLesson } from "@/server/api/scripts/lessons";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

const RenderLesson = dynamic(() => import("@/components/render"), {
  loading: () => <div>Loading...</div>,
});

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

  return (
    <RenderLesson isDisplay lesson={lesson} courseId={id} session={null} />
  );
}
