import {
  Sidebar,
  SidebarFooter,
  SidebarContent,
} from "@/components/ui/sidebar";
import React, { Suspense } from "react";
import { UserNav } from "./auth";
import { LessonSidebarContent } from "./content";

// Assuming SidebarProvider is wrapping the layout higher up
export const LessonSidebarContainer = (props: {
  params: Promise<{
    id: string;
    unitId: string;
    lessonId: string;
  }>;
}) => {
  return (
    // Removed the outer div
    <Sidebar
      // Use library variants/props as needed
      collapsible="offcanvas"
      variant="floating"
      side="left"
      className="border-sidebar border-none" // Example: Use standard border or library's --sidebar-border
    >
      {/* Content is now rendered within Sidebar */}
      <Suspense fallback={<SidebarContent>Loading Course...</SidebarContent>}>
        {/* Pass params down */}
        <LessonSidebarContent params={props.params} />
      </Suspense>
      <SidebarFooter>
        <Suspense fallback={<div>Loading User...</div>}>
          <UserNav />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
};
