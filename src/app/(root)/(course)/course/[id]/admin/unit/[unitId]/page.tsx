import React from "react";
import { Reorder } from "./_components/reorder";

export default function Page({
  params,
}: {
  params: Promise<{
    unitId: string;
    id: string;
  }>;
}) {
  return (
    <main className="container mx-auto flex w-full flex-col">
      <Reorder params={params} />
    </main>
  );
}

export const dynamic = 'force-dynamic';
