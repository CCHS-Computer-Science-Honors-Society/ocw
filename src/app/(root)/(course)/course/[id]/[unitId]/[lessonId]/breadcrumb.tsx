import { BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage, Breadcrumb } from '@/components/ui/breadcrumb'
import React from 'react'
import { getSidebarData } from './_queries';

export const BreadcrumbCourse = async ({
  params
}: {
  params: Promise<{
    lessonId: string;
    id: string;
  }>
}) => {
  const courseId = (await params).id;
  const data = await getSidebarData(courseId);
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="">
            <BreadcrumbLink href="/courses">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="" />
          <BreadcrumbItem>
            <BreadcrumbPage>{data[0]?.course.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
