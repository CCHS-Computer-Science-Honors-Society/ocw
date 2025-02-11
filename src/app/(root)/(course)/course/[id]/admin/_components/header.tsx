// ServerHeader.tsx
import React from "react";

import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { cache } from "@/lib/cache";
import { courses, lessons, units } from "@/server/db/schema";
import { ClientHeader } from "./header.client";

export const getCourseById = cache(async (id: string) => {
  return await db.query.courses.findFirst({
    where: eq(courses.id, id),
    columns: { id: true, name: true },
  });
}, ["getCourseByIdforDashboard", "data"], {
  tags: ["getCourseByIdforDashboard", "data"],
});

export const getUnitById = cache(async (unitId?: string) => {
  if (!unitId) return undefined;
  return await db.query.units.findFirst({
    where: eq(units.id, unitId),
    columns: { id: true, name: true },
  });
},
  ["byUnitId", "data"],
  {
    tags: ["byUnitId", "data"],
  }
);

export const getLessonById = cache(async (lessonId?: string) => {
  if (!lessonId) return undefined;
  return await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    columns: { id: true, name: true },
  });
},
  ["getLessonById", "data"],
  {
    tags: ["getLessonById", "data"],
  }
);

export default async function ServerHeader({
  params,
}: {
  params: { id: string; unitId?: string; lessonId?: string };
}) {
  const [course, unit, lesson] = await Promise.all([
    getCourseById(params.id),
    getUnitById(params.unitId),
    getLessonById(params.lessonId),
  ]);

  return (
    <ClientHeader
      courseName={course?.name || "Course"}
      unitName={unit?.name}
      lessonName={lesson?.name}
    />
  );
}
