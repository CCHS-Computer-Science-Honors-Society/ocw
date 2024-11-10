import React from "react";
import { getSidebarData } from "../../_queries";
import LessonsSidebar from "./sidebar";

export default async function Sidebar({
  params,
  className,
}: {
  params: Promise<{
    id: string;
  }>;
  className?: string;
}) {
  const courseId = (await params).id;
  const data = await getSidebarData(courseId);
  return (
    <div className={className}>
      <LessonsSidebar courseId={courseId} data={data} />
    </div>
  );
}
