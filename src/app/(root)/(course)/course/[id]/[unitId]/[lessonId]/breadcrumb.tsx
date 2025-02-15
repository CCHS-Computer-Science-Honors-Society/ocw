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
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="">
            <BreadcrumbLink href="/courses">Courses</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="" />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/course/${data[0]?.courseId}`}>
              {data[0]?.course.name ?? "Unknown Course"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="" />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/course/${data[0]?.courseId}/${data[0]?.id}`}
            >
              {data[0]?.name ?? "Unknown Unit"}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="" />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {data[0]?.lessons.find((lesson) => lesson.id === lessonId)?.name ?? "Unknown Lesson"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
