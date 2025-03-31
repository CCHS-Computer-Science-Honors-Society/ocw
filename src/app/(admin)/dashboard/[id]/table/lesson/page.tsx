import React from "react";
import { LessonGrid } from "../_table/lessons.grid";

export default function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  return <LessonGrid params={params} />;
}

export const experimental_ppr = true;
