import React from "react";
import { UnitTable } from "./units.grid.client";
import { api } from "@/trpc/server";

export const Units = async ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const id = (await params).id;
  void api.units.getTableData.prefetch({
    courseId: id,
  });

  return (
    <div>
      <UnitTable id={id} />
    </div>
  );
};
