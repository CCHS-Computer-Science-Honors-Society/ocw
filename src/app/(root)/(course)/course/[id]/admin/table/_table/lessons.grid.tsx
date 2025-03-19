import React, { Suspense } from "react";
import { LessonTable } from "./lesson.grid.client";
import { db } from "@/server/db";
import { units } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "@/lib/cache";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { LessonTableSkeleton } from "./lesson.grid.skeleton";

const getData = cache(
  async (courseId: string) => {
    return await db
      .select({
        value: units.id,
        label: units.name,
      })
      .from(units)
      .where(eq(units.courseId, courseId));
  },
  ["getUnitsForLesson"],
  {
    tags: ["getUnitsForLesson"],
  },
);
export const LessonGrid = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const courseId = (await params).id;
  const units = await getData(courseId);

  prefetch(trpc.lesson.getTableData.queryOptions({
    courseId,
  }));

  return (
    <HydrateClient>
      <Suspense fallback={<LessonTableSkeleton />}>
        <LessonTable units={units} courseId={courseId} />
      </Suspense>
    </HydrateClient>
  );
};
