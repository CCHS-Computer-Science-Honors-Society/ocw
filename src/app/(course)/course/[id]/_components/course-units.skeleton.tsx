import { Skeleton } from "@/components/ui/skeleton";

export default function CourseOverviewSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        {/* Sidebar Skeleton */}
        <div className="bg-background w-96 border-r p-6">
          <div className="mb-6">
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-6 w-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area Skeleton */}
        <div className="flex-1 p-6 pt-8">
          <Skeleton className="mb-6 h-10 w-3/4" />
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="mb-4 flex items-center gap-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
                <div className="space-y-3 pl-12">
                  {Array.from({ length: 5 }).map((_, subIndex) => (
                    <Skeleton key={subIndex} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
