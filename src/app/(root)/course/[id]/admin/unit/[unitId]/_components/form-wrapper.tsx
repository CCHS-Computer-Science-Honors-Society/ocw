import React, { Suspense } from "react";
import { LessonForm } from "./form";
import { api } from "@/trpc/server";
import { LessonFormSkeleton } from "../_skeleton";

export async function Form({
  params,
}: {
  params: Promise<{ id: string; unitId: string }>;
}) {
  const data = await params;
  console.log(data);
  void api.units.getMinimalUnit.prefetch({
    unitId: data.id,
  });
  return (
    <Suspense fallback={<LessonFormSkeleton />}>
      <LessonForm unitId={data.id} courseId={data.id} />
    </Suspense>
  );
}
