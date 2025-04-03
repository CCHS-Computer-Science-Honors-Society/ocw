import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BookIcon } from "lucide-react";
import React from "react";
import { type SidebarData } from "../../_queries";

// Renamed component for clarity
export const CourseHeader = ({ data }: { data: SidebarData }) => {
  // Assuming data is not empty based on checks in parent
  const course = data[0]?.course;

  if (!course) {
    return (
      <SidebarHeader className="p-4">
        <span className="text-sidebar-foreground">Course Not Found</span>
      </SidebarHeader>
    );
  }

  return (
    // Use padding from parent or add here if needed e.g., p-4
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          {/* Use div directly if not interactive */}
          <div className="flex items-center gap-3 p-3">
            <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-sidebar-accent">
              <BookIcon className="size-6 text-white" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate text-xl font-semibold">
                {course.name}
              </span>
              <span className="truncate text-xs text-sidebar-foreground">
                {course.subjectId} {/* Or other relevant info */}
              </span>
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
