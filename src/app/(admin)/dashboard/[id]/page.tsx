import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CreateLessonForm } from "./lesson/[lessonId]/_components/form";
import { CreateUnitForm } from "./_components/create-unit";
import { UnitTable } from "./_table/unit";
import { getData, getUnits } from "./_queries";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { TableSkeleton } from "./_table/loading";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const courseId = (await params).id;

  const data = await getData(courseId);
  const unitsMap = getUnits(courseId);

  void prefetch(trpc.units.getTableData.queryOptions({ courseId }));

  if (!data) {
    notFound();
  }

  return (
    <div className="container mx-auto flex flex-col gap-10 pt-10">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-3xl font-bold">{data.name}</h1>
        </div>
        <div className="flex flex-row gap-4">
          <CreateLessonForm unitsPromise={unitsMap} courseId={courseId} />
          <CreateUnitForm courseId={courseId} />
        </div>
      </div>

      <HydrateClient>
        <Suspense fallback={<TableSkeleton />}>
          <UnitTable courseId={courseId} />
        </Suspense>
      </HydrateClient>
    </div>
  );
}

export const experimental_ppr = true;
