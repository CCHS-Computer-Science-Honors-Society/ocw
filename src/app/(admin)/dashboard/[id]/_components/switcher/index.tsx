import { trpc, HydrateClient, prefetch } from "@/trpc/server";
import React, { Suspense } from "react";
import { CourseSwitcherClient } from "./client";

export const CourseSwitcher = () => {
  prefetch(trpc.users.getElevatedCourses.queryOptions({}));
  return (
    <HydrateClient>
      <Suspense fallback="loading">
        <CourseSwitcherClient />
      </Suspense>
    </HydrateClient>
  );
};
