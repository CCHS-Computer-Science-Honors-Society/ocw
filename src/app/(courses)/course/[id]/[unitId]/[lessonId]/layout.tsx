import React from "react";
import Sidebar from "./_components/sidebar";

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
    <div className="h-screen w-full">
      <div className="flex h-full flex-row">
        <div className="w-full bg-muted/40">
          <Sidebar className="p-5" params={params} />
        </div>
        {children}
      </div>
    </div>
  );
}
