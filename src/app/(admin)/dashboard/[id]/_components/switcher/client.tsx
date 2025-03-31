"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTRPC } from "@/trpc/react";

import { useSuspenseQuery } from "@tanstack/react-query";

export function CourseSwitcherClient() {
  const api = useTRPC();
  const { id: currentCourseId } = useParams();
  const { data: courses } = useSuspenseQuery(
    api.users.getElevatedCourses.queryOptions({}),
  );
  const pathname = usePathname();
  const path = pathname.split("/").slice(2).join("/");
  const activeCourse =
    courses.find((p) => p.id === currentCourseId) ?? courses[0];

  if (!activeCourse) return <Link href="/">Home</Link>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full rounded-md ring-ring hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 data-[state=open]:bg-accent">
        <div className="flex items-center gap-1.5 overflow-hidden px-2 py-1.5 text-left text-sm transition-all">
          <div className="line-clamp-1 flex-1 pr-2 font-medium">
            {activeCourse.name}
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground/50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64"
        align="start"
        side="right"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Groups
        </DropdownMenuLabel>
        {courses.map((course) => (
          <Link
            key={course.id}
            href={`/dashboard/${course.id}/${path}`}
            className="items-start gap-2 px-1.5"
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-primary-foreground"></div>
              <div className="grid flex-1 leading-tight">
                <div className="line-clamp-1 font-medium">{course.name}</div>
              </div>
            </div>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
