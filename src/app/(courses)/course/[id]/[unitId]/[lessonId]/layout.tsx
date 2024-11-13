import React, { Suspense } from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "@/components/navbar";
import { UserMenu } from "@/components/user-menu";
import EditButton, { EditButtonSkeleton } from "./_components/edit-button";

export default function Layout({
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
    <div className="flex h-screen w-full flex-col">
      <Navbar userNav={<UserMenu />} />
      <div className="flex h-full w-full flex-row">
        <div className="w-1/4">
          <Suspense fallback={<div />}>
            <Sidebar className="p-5" params={params} />
          </Suspense>
        </div>
        {children}
        <Suspense fallback={<EditButtonSkeleton />}>
          <EditButton params={params} />
        </Suspense>
      </div>
    </div>
  );
}
