import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import {
  FormContext,
  UpdateUnitDescription,
  UpdateUnitName,
  UpdateUnitPublishStatus,
} from "./_components/form";
import { db } from "@/server/db";
import { notFound } from "next/navigation";
import { LessonsForm } from "./_components/lesson-order-form";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; unitId: string }>;
}) {
  const { unitId, id } = await params;
  const data = await db.query.units.findFirst({
    where: (units, { eq }) => eq(units.id, unitId),
  });

  if (!data) {
    return notFound();
  }
  return (
    <main className="container mx-auto py-10">
      <FormContext data={data} courseId={id}>
        <div className="grid w-full grid-cols-3 grid-rows-3 gap-4">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">
                Unit Name
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UpdateUnitName />
            </CardContent>
          </Card>

          <div className="col-start-3 row-span-3">
            <LessonsForm unitId={data.id} />
          </div>
          <Card className="col-span-2 row-start-2">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">
                Unit Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UpdateUnitDescription />
            </CardContent>
          </Card>
          <Card className="col-span-2 row-start-3">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold">
                Unit Publish Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <UpdateUnitPublishStatus />
            </CardContent>
          </Card>
        </div>
      </FormContext>
    </main>
  );
}
