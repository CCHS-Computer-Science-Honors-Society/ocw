import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CreateLesson } from "./_components/create";
import { CreateUnitPopup } from "./_components/create-unit";
import { UnitsForm } from "./_components/units-dnd-form";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const courseId = (await params).id;
  const [data] = await Promise.all([
    db.query.courses.findFirst({
      where: (courses, { eq }) => eq(courses.id, courseId),
      columns: {
        id: true,
        name: true,
        description: true,
        unitLength: true,
      },
    }),
  ]);

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
          <CreateLesson courseId={courseId} />
          <CreateUnitPopup courseId={courseId} />
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <UnitsForm courseId={courseId} />
      </Suspense>
    </div>
  );
}

export const experimental_ppr = true;
