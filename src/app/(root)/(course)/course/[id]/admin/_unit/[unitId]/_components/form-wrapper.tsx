import React from "react";
import { LessonForm } from "./form";
import { api } from "@/trpc/server";
import { auth } from "@/server/auth";
import { notFound } from "next/navigation";

export async function Form({
  params,
}: {
  params: Promise<{ id: string; unitId: string }>;
}) {
  const [data, session] = await Promise.all([params, auth]);
  if (!session) {
    notFound();
  }
  const units = await api.units.getMinimalUnit({
    unitId: data.unitId,
  });
  console.log(units);
  return <LessonForm data={units} courseId={data.id} />;
}
