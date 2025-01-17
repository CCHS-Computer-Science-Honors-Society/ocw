import Navbar from "@/components/navbar";
import { UserMenu } from "@/components/user-menu";
import { getCourseById } from "@/server/api/scripts";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
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

  if (!course) {
    notFound();
  }

  return {
    title: course.name,
    description: course.description,
    openGraph: {
      title: course.name,
      description: course.description,
    },
    twitter: {
      card: "summary_large_image",
      title: course.name,
      description: course.description,
    },
  };
}

export default async function CoursePage(props: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <Navbar
        isSearch
        userNav={
          <Suspense fallback="loading">
            <UserMenu />
          </Suspense>
        }
      />
      <Suspense fallback={<CourseOverviewSkeleton />}>
        <CourseContent params={props.params} />
      </Suspense>
    </div>
  );
}

export const experimental_ppr = true;
