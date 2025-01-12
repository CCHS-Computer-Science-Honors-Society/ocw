import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function LessonFormSkeleton() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-10">
      {/* Name field skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-40" />
      </div>

      {/* Description field skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Public switch skeleton */}
      <Card className="flex flex-row items-center justify-between p-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-6 w-10" />
      </Card>

      {/* Submit button skeleton */}
      <Skeleton className="h-10 w-24" />
    </div>
  );
}

export function LessonListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <Skeleton className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center gap-x-2 rounded-md border border-slate-200 bg-slate-100 text-sm",
          )}
        >
          <Skeleton className="h-[42px] w-[34px] rounded-l-md" />
          <Skeleton className="h-4 w-[120px]" />
          <div className="ml-auto flex items-center gap-x-2 pr-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-4 w-4 rounded-sm" />
          </div>
        </div>
      ))}
    </Skeleton>
  );
}
