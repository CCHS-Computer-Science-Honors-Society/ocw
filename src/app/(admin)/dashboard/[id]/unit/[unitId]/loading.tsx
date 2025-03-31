import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
  return (
    <main className="container mx-auto flex w-full flex-col">
      <Skeleton className="h-2/3 w-2/3" />
    </main>
  );
}
