import React from "react";
import { LessonTable } from "./lesson.grid.client";
import { db } from "@/server/db";
import { units } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "@/lib/cache";
import { api } from "@/trpc/server";

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

  void api.lesson.getTableData.prefetch({
    courseId,
  });
  return (
    <div>
      <LessonTable units={units} courseId={courseId} />
    </div>
  );
};
