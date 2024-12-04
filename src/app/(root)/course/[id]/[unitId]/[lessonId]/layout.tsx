import React, { Suspense } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { getSidebarData } from "./_queries";
import { LessonSidebar } from "./_components/sidebar/sidebar";
import { Separator } from "@/components/ui/separator";
import { UserMenu } from "@/components/user-menu";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    id: string;
    lessonId: string;
  }>;
}) {
  const courseId = (await params).id;
  const data = await getSidebarData(courseId);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "30rem",
        } as React.CSSProperties
      }
    >
      <LessonSidebar data={data} courseId={courseId} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 flex-row items-center justify-between gap-2 px-4">
          <div className="flex flex-row items-center">
            <SidebarTrigger className="-ml-1 text-3xl" />
            <Separator orientation="vertical" className="mr-2 h-4" />
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
          <Suspense fallback="loading">
            <UserMenu />
          </Suspense>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
