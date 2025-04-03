import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="flex w-full flex-col justify-start gap-4 p-4 lg:p-6">
      {/* Toolbar Skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-9 w-[200px]" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-[100px]" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-lg border">
        {/* Header */}
        <div className="bg-muted p-4">
          <div className="flex items-center space-x-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-[150px]" />
            ))}
          </div>
        </div>

        {/* Rows */}
        <div className="p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 py-3">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-5 w-[150px]" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex-1">
          <Skeleton className="h-5 w-[200px]" />
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-[140px]" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-[100px]" />
          </div>
          <div className="flex items-center space-x-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-8" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
