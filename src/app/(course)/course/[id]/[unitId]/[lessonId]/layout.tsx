import React, { Suspense } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbCourse } from "./breadcrumb";
import { LessonSidebar } from "./_components/sidebar";
import { SearchDropdownComponent } from "@/components/search";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const Explore = dynamic(import("@/components/explore-button"), {
  ssr: true,
  loading: () => <div>Loading...</div>,
});

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
  return (
    <div className="flex h-screen flex-col">
      <SidebarProvider
        style={{
          //@ts-expect-error should work according to docs
          "--sidebar-width": "21rem",
        }}
      >
        <Suspense>
          <LessonSidebar params={params} />
        </Suspense>
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <header className="flex h-16 shrink-0 items-center justify-between gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />

                <Suspense>
                  <BreadcrumbCourse params={params} />
                </Suspense>
              </div>
              <div className="flex items-center gap-2 leading-none">
                <Link
                  href={"/"}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "p-2 text-sm font-medium",
                  )}
                >
                  Home
                </Link>
                <Explore />
                <SearchDropdownComponent />
              </div>
            </header>
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
