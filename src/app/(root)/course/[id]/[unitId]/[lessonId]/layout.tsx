import React, { Suspense } from "react";
import Sidebar from "./_components/sidebar";

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
      <div className="flex h-full w-full flex-row">
        <div className="w-1/4">
          <Suspense fallback={<div />}>
            <Sidebar className="hidden p-5 md:block" params={params} />
          </Suspense>
        </div>
        {children}
      </div>
    </div>
  );
}
