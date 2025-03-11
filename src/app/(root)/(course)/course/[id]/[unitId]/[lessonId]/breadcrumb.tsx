import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  Breadcrumb,
} from "@/components/ui/breadcrumb";
import React from "react";
import { getSidebarData } from "./_queries";

export const BreadcrumbCourse = async ({
  params,
}: {
  params: Promise<{
    lessonId: string;
    id: string;
  }>;
}) => {
  const { id: courseId, lessonId } = await params;
  const data = await getSidebarData(courseId);

  const currentLesson = data.flatMap((unit) =>
    unit.lessons.filter((lesson) => lesson.id === lessonId),
  )[0]?.name;

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:flex">
            <BreadcrumbLink href="/courses" className="hidden md:flex">
              Courses
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:flex" />
          <BreadcrumbItem className="hidden md:flex">
            <BreadcrumbLink
              className="hidden md:flex"
              href={`/course/${data[0]?.courseId}`}
            >
              {data[0]?.course.name ?? "Unknown Course"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:flex" />
          <BreadcrumbItem className="hidden md:flex">
            <BreadcrumbLink
              href={`/course/${data[0]?.courseId}/${data[0]?.id}`}
            >
              {data[0]?.name ?? "Unknown Unit"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:flex" />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentLesson ?? "Unknown Lesson"}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
