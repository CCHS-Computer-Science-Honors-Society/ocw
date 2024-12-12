import { LessonOrderForm } from "./lesson-order-form";

export async function LessonsOrder({
  params,
}: {
  params: Promise<{ id: string; unitId: string }>;
}) {
  const data = await params;

  return <LessonOrderForm unitId={data.unitId} courseId={data.id} />;
}
