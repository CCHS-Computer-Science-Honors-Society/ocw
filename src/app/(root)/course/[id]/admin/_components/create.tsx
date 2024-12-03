import { getCourseById } from "@/server/api/scripts";
import React from "react";
import { CreateLessonForm } from "./create-lesson";

export async function CreateLesson({ courseId }: { courseId: string }) {
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
    <CreateLessonForm units={combobox} position={data.units.length + 100} />
  );
}
