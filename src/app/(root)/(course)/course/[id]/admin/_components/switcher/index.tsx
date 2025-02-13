import { api, HydrateClient } from "@/trpc/server";
import React, { Suspense } from "react";
import { CourseSwitcherClient } from "./client";

export const CourseSwitcher = () => {
  void api.users.getElevatedCourses.prefetch({});
  return (
    <HydrateClient>
      <Suspense fallback="loading">
        <CourseSwitcherClient />
      </Suspense>
    </HydrateClient>
  );
};
