import React, { Suspense } from "react";
import { CourseList, CourseListSkeleton } from "./_components/courselist";

export default function Page() {
  return (
    <div className="container mx-auto py-16">
      <Suspense fallback={<CourseListSkeleton />}>
        <CourseList />
      </Suspense>
    </div>
  );
}

export const experimental_ppr = true;
