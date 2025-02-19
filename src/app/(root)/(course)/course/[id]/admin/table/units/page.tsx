import React, { Suspense } from "react";
import { Units } from "../_table/units.grid";
import { UnitTableSkeleton } from "../_table/units.grid.skeleton";
import { HydrateClient } from "@/trpc/server";

export default function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  return (
    <HydrateClient>
      <Suspense fallback={<UnitTableSkeleton />}>
        <Units params={params} />
      </Suspense>
    </HydrateClient>
  );
}

export const dynamic = "force-dynamic";
