import React, { Suspense } from "react";
import { LessonOrderForm } from "./lesson-order-form";
import { api } from "@/trpc/server";
import { LessonListSkeleton } from "../_skeleton";

export async function LessonsOrder({
  params,
}: {
  params: Promise<{ id: string; unitId: string }>;
}) {
  const data = await params;

  void api.lesson.getLessonsForDashboard.prefetch({
    unitId: data.id,
  });

  return (
    <Suspense fallback={<LessonListSkeleton />}>
      <LessonOrderForm unitId={data.unitId} courseId={data.id} />
    </Suspense>
  );
}
