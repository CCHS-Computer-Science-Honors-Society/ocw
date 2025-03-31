import React, { Suspense } from "react";
import EditButton, {
  EditButtonSkeleton,
} from "./[unitId]/[lessonId]/_components/edit-button";

export default function Layout({
  params,
  children,
}: {
  params: Promise<{
    id: string;
  }>;

  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <Suspense fallback={<EditButtonSkeleton />}>
        <EditButton params={params} />
      </Suspense>
    </div>
  );
}

export const experimental_ppr = true;
