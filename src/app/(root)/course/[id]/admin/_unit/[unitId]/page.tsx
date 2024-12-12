import React, { Suspense } from "react";
import { LessonsOrder } from "./_components/lesson-order-wrapper";
import { Form } from "./_components/form-wrapper";
import { LessonFormSkeleton, LessonListSkeleton } from "./_skeleton";
import { HydrateClient } from "@/trpc/server";

export default function Page({
  params,
}: {
  params: Promise<{ id: string; unitId: string }>;
}) {
  return (
    <main className="container mx-auto py-10">
      <div className="flex w-full flex-row gap-10">
        <HydrateClient>
          <div className="w-1/2">
            <Suspense fallback={<LessonFormSkeleton />}>
              <Form params={params} />
            </Suspense>
          </div>
          <div className="w-1/2">
            <Suspense fallback={<LessonListSkeleton />}>
              <LessonsOrder params={params} />
            </Suspense>
          </div>
        </HydrateClient>
      </div>
    </main>
  );
}
