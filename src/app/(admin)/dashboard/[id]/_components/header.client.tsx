"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRouter, useParams } from "next/navigation";
import { useTRPC } from "@/trpc/react";
import { z } from "zod";

import { useSuspenseQuery } from "@tanstack/react-query";

const safeString = z.preprocess((val) => {
  return Array.isArray(val) ? val[0] : val;
}, z.string());

const paramsSchema = z.object({
  id: safeString,
  unitId: safeString.optional(),
  lessonId: safeString.optional(),
});

export const ClientHeader = () => {
  const api = useTRPC();
  const router = useRouter();
  const rawParams = useParams();
  const { id, unitId, lessonId } = paramsSchema.parse(rawParams);

  const handleClick = (index: number) => {
    if (index === 0) router.push(`/course/${id}/admin/`);
    else if (index === 1) router.push(`/course/${id}/admin/unit/${unitId}`);
    else if (index === 2) router.push(`/course/${id}/admin/lesson/${lessonId}`);
  };

  const { data: breadcrumbs } = useSuspenseQuery(
    api.courses.getBreadcrumbData.queryOptions({
      courseId: id,
      unitId: unitId,
      lessonId: lessonId,
    }),
  );

  return (
    <div>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <React.Fragment key={breadcrumb.id}>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem
                    onClick={!isLast ? () => handleClick(index) : undefined}
                    style={{ cursor: !isLast ? "pointer" : "default" }}
                  >
                    {isLast ? (
                      <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink>{breadcrumb.name}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </header>
    </div>
  );
};
