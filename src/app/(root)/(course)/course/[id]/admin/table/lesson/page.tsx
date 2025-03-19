import React, { Suspense } from "react";
import { LessonGrid } from "../_table/lessons.grid";
import { LessonTableSkeleton } from "../_table/lesson.grid.skeleton";

export default function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  return (
    <Suspense fallback={<LessonTableSkeleton />}>
      <LessonGrid params={params} />
    </Suspense>
  );
}

export const experimental_ppr = true;
export const dynamic = "force-dynamic";
