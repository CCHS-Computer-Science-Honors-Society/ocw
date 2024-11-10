import React, { Suspense } from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "@/components/navbar";
import { UserMenu } from "@/components/user-menu";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
}) {
  return (
    <div className="flex h-screen w-full flex-col">
      <Navbar userNav={<UserMenu />} />
      <div className="flex h-full flex-row">
        <div className="w-1/4">
          <Suspense fallback={<div />}>
            <Sidebar className="p-5" params={params} />
          </Suspense>
        </div>
        {children}
      </div>
    </div>
  );
}
