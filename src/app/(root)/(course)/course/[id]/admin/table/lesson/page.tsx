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
  return <LessonGrid params={params} />;
}

export const experimental_ppr = true;
export const dynamic = "force-dynamic";
