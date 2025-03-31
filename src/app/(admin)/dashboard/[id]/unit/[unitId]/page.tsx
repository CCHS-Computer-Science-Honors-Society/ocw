import React from "react";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { LessonTable } from "../../_table/lesson";
import { getUnits } from "../../_queries";

export default async function Page({
  params,
}: {
  params: Promise<{
    unitId: string;
    id: string;
  }>;
}) {
  const { id, unitId } = await params;
  prefetch(
    trpc.lesson.getTableData.queryOptions({
      courseId: id,
      unitId,
    }),
  );

  const units = await getUnits(id);

  return (
    <main className="container mx-auto flex w-full flex-col">
      <HydrateClient>
        <LessonTable courseId={id} unitId={unitId} units={units} />
      </HydrateClient>
    </main>
  );
}
