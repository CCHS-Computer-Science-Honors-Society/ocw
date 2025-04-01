import Navbar from "@/components/navbar";
import { getCourseById } from "@/server/api/scripts";
import { type Metadata } from "next";
import { Suspense } from "react";
import CourseOverviewSkeleton from "./_components/course-units.skeleton";
import { CourseContent } from "./_components/course-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;

  const course = await getCourseById(id);

  return {
    title: `Dashboard | ${course?.name}`,
    description: course?.description,
  };
}

export default function CoursePage(props: { params: Promise<{ id: string }> }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <Navbar isSearch />
      <Suspense fallback={<CourseOverviewSkeleton />}>
        <CourseContent params={props.params} />
      </Suspense>
    </div>
  );
}
export const experimental_ppr = true;
