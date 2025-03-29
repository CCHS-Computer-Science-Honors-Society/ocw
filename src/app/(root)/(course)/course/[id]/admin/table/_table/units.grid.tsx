import React from "react";
import { UnitTable } from "./units.grid.client";
import { prefetch, trpc } from "@/trpc/server";
import { getSession } from "@/server/auth/auth.server";

export const Units = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await params;

  prefetch(
    trpc.units.getUnitsForDashboard.queryOptions({
      courseId: id,
    }),
  );

  return (
    <div>
      <UnitTable id={id} />
    </div>
  );
};
export const dynamic = "force-dynamic";
