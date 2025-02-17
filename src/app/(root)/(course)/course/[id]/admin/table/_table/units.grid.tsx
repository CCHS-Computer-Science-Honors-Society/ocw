import React from "react";
import { UnitTable } from "./units.grid.client";
import { api } from "@/trpc/server";
import { auth } from "@/server/auth";

export const Units = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const [{ id }, session] = await Promise.all([params, auth()]);

  if (session?.user) {
    void api.units.getTableData.prefetch({
      courseId: id,
    });
  }

  return (
    <div>
      <UnitTable id={id} />
    </div>
  );
};
export const dynamic = "force-dynamic";
