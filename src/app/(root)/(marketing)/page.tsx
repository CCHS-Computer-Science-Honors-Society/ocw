import React, { Suspense } from "react";
import { CourseList, CourseListSkeleton } from "./_components/courselist";
import { HeroSection } from "./_components/hero";

export default function Page() {
  return (
    <div className="w-full bg-muted/10">
      <main className="flex w-full flex-1 flex-col rounded-xl bg-white p-4 transition-all duration-300 ease-in-out">
        <div className="sm:py-42 pb-32 pt-12">
          <HeroSection />
        </div>
        <section className="container mx-auto px-4 pb-12">
          <Suspense fallback={<CourseListSkeleton />}>
            <CourseList />
          </Suspense>
        </section>
      </main>
    </div>
  );
}

export const experimental_ppr = true;
