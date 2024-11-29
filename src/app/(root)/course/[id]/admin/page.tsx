import { getCourseById } from "@/server/api/scripts";
import { CreateLessonForm } from "./_components/create-lesson";
import React from "react";
import { CreateUnitPopup } from "./_components/create-unit";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const courseId = (await params).id;
  const data = await getCourseById(courseId);

  if (!data) {
    return <div>Course not found :(</div>;
  }

  const combobox = data.units.map((unit) => {
    return {
      name: unit.name,
      id: unit.id,
    };
  });

  return (
    <div>
      <CreateLessonForm units={combobox} position={data.units.length + 100} />
      <CreateUnitPopup courseId={courseId} />
    </div>
  );
}
