import React from "react";
import { getSidebarData } from "../../_queries";
import { UnitLessonNavigation } from "./client"; // Renamed client component
import { CourseHeader } from "./header"; // Renamed header component
import { SidebarContent, SidebarHeader } from "@/components/ui/sidebar"; // Import library components
import { SidebarSeparator } from "@/components/ui/sidebar"; // Import separator

export const LessonSidebarContent = async ({
  params,
}: {
  params: Promise<{
    id: string;
    unitId: string; // Added unitId
    lessonId: string;
  }>;
}) => {
  // Resolve params once
  const resolvedParams = await params;
  const { id: courseId, unitId, lessonId } = resolvedParams;

  // Fetch data
  const data = await getSidebarData(courseId);

  if (!data || data.length === 0) {
    // Handle case where data is not found or empty
    return (
      <>
        <SidebarHeader className="p-4">Course Info</SidebarHeader>
        <SidebarSeparator />
        <SidebarContent className="p-4">No units found.</SidebarContent>
      </>
    );
  }

  // Pass resolved params and data
  return (
    <>
      <CourseHeader data={data} />
      <SidebarSeparator />
      <SidebarContent>
        {/* Pass resolved params and data to the client component */}
        <UnitLessonNavigation
          data={data}
          courseId={courseId}
          initialUnitId={unitId}
          initialLessonId={lessonId}
        />
      </SidebarContent>
    </>
  );
};
