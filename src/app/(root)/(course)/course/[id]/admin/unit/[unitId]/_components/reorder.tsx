import React from "react";
import { LessonsForm } from "./reorder.form";

export const Reorder = async (props: {
  params: Promise<{
    unitId: string;
    id: string;
  }>;
}) => {
  const params = await props.params;

  return (
    <div>
      <LessonsForm id={params.id} unitId={params.unitId} />
    </div>
  );
};
