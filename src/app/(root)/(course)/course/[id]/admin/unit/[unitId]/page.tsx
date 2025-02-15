import React from "react";
import { Reorder } from "./_components/reorder";
import { LessonGrid } from "../../table/_table/lessons.grid";

export default function Page({
  params,
}: {
  params: Promise<{
    unitId: string;
    id: string;
  }>;
}) {
  return (
    <main className="container mx-auto flex w-full flex-col">
      <Reorder params={params} />
    </main>
  );
}
