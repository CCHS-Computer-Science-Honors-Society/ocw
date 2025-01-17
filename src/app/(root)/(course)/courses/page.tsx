import { Suspense } from "react";
import { CoursesGrid } from "./_components/grid";
import { BookPagination } from "./_components/pagination";
import {
  estimateTotalCourses,
  fetchCoursesWithPagination,
  ITEMS_PER_PAGE,
} from "./_queries";
import { parseSearchParams } from "@/lib/url-state";
import { Search, SearchFallback } from "./_components/search";

export default async function Page(props: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const parsedSearchParams = parseSearchParams(searchParams);

  const [courses, estimatedTotal] = await Promise.all([
    fetchCoursesWithPagination(parsedSearchParams),
    estimateTotalCourses(parsedSearchParams),
  ]);

  const totalPages = Math.ceil(estimatedTotal / ITEMS_PER_PAGE);
  const currentPage = Math.max(1, Number(parsedSearchParams.page) || 1);

  return (
    <main className="flex h-full flex-col p-10">
      <div className="flex w-full flex-row gap-10">
        <Suspense fallback={<SearchFallback />}>
          <Search />
        </Suspense>
      </div>
      <div className="flex h-full flex-col">
        <div className="min-h-[200px] flex-grow overflow-auto">
          <div className="p-4 group-has-[[data-pending]]:animate-pulse">
            <CoursesGrid courses={courses} searchParams={parsedSearchParams} />
          </div>
        </div>
        <div className="mt-auto border-t p-4">
          <Suspense fallback={null}>
            <BookPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={estimatedTotal}
              searchParams={parsedSearchParams}
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
