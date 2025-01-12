import { Suspense } from 'react';
import { CoursesGrid } from './_components/grid';
import { BookPagination } from './_components/pagination';
import {
  estimateTotalCourses,
  fetchCoursesWithPagination,
  ITEMS_PER_PAGE,
} from './_queries';
import { parseSearchParams } from '@/lib/url-state';
import { Search, SearchFallback } from './_components/search';

export default async function Page(
  props: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
  }
) {
  const searchParams = await props.searchParams;
  const parsedSearchParams = parseSearchParams(searchParams);

  const [courses, estimatedTotal] = await Promise.all([
    fetchCoursesWithPagination(parsedSearchParams),
    estimateTotalCourses(parsedSearchParams),
  ]);

  const totalPages = Math.ceil(estimatedTotal / ITEMS_PER_PAGE);
  const currentPage = Math.max(1, Number(parsedSearchParams.page) || 1);

  return (
    <main className="flex flex-col h-full p-10">
      <div className="flex flex-row w-full gap-10">
        <Suspense fallback={<SearchFallback />}>
          <Search />
        </Suspense>

      </div>
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-auto min-h-[200px]">
          <div className="group-has-[[data-pending]]:animate-pulse p-4">
            <CoursesGrid courses={courses} searchParams={parsedSearchParams} />
          </div>
        </div>
        <div className="mt-auto p-4 border-t">
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
