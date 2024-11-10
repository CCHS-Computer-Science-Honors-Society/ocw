import React, { Suspense } from "react";
import { CourseList, CourseListSkeleton } from "./_components/courselist";
import { SearchDropdownComponent } from "@/components/search";

export default function Page() {
  return (
    <div className="container mx-auto py-16">
      <Suspense fallback={<CourseListSkeleton />}>
        <CourseList />
      </Suspense>
    </div>
  );
}
