import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen } from "lucide-react";
import React from "react";

export default function CourseListSkeleton() {
  return (
    <div className="grid h-full w-full grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="col-span-1 flex flex-col gap-4">
          <Card className="overflow-hidden">
            <div className="bg-muted flex aspect-video items-center justify-center">
              <BookOpen className="text-muted-foreground h-10 w-10" />
            </div>
            <CardContent className="p-6">
              <div className="bg-muted mb-2 h-4 w-60" />
              <div className="bg-muted mb-2 h-4 w-40" />
            </CardContent>
          </Card>
        </Skeleton>
      ))}
    </div>
  );
}
