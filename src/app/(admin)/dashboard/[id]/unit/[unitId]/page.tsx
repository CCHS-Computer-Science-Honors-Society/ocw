import React, { Suspense } from "react";
import { LessonTable } from "../../_table/lesson";
import { getUnits } from "../../_queries";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { TableSkeleton } from "../../_table/loading";

export default async function Page({
  params,
}: {
  params: Promise<{
    unitId: string;
    id: string;
  }>;
}) {
  const { unitId, id } = await params;
  const units = getUnits(id);
  prefetch(trpc.units.getTableData.queryOptions({ courseId: id }));

  return (
    <HydrateClient>
      <main className="container mx-auto flex w-full flex-row">
        <div className="">
          <Suspense fallback={<TableSkeleton />}>
            <LessonTable courseId={id} unitId={unitId} unitsPromise={units} />
          </Suspense>
        </div>
      </main>
    </HydrateClient>
  );
}
