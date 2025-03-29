import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CreateLessonForm } from "./lesson/[lessonId]/_components/form";
import { units } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { CreateUnitForm } from "./_components/create-unit";
import { UnitTable } from "./_components/table/unit";
const getData = async (courseId: string) => {
  return await db.query.courses.findFirst({
    where: (courses, { eq }) => eq(courses.id, courseId),
    columns: {
      id: true,
      name: true,
      description: true,
      unitLength: true,
    },
  });
};

const getUnits = async (courseId: string) => {
  return await db
    .select({
      label: units.name,
      value: units.id,
    })
    .from(units)
    .where(eq(units.courseId, courseId));
};
export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const courseId = (await params).id;

  const [data, unitsMap] = await Promise.all([
    getData(courseId),
    getUnits(courseId),
  ]);

  if (!data) {
    notFound();
  }
  console.log(unitsMap);

  return (
    <div className="container mx-auto flex flex-col gap-10 pt-10">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-3xl font-bold">{data.name}</h1>
        </div>
        <div className="flex flex-row gap-4">
          <CreateLessonForm units={unitsMap} courseId={courseId} />
          <CreateUnitForm courseId={courseId} />
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Suspense>
          <UnitTable courseId={courseId} />
        </Suspense>
      </Suspense>
    </div>
  );
}

export const experimental_ppr = true;
export const dynamic = "force-dynamic";
