import Link from 'next/link';
import { SearchParams, stringifySearchParams } from '@/lib/url-state';
import { Courses } from '@/server/db/schema';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export async function CoursesGrid({
  courses,
  searchParams,
}: {
  courses: Courses[];
  searchParams: SearchParams;
}) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7 auto-rows-fr">
      {!courses?.length ? (
        <p className="text-center text-muted-foreground col-span-full">
          No courses found.
        </p>
      ) : (
        courses.map((course, index) => (
          <CourseLink
            key={course.id}
            course={course}
            priority={index < 10}
            searchParams={searchParams}
          />
        ))
      )}
    </div>
  );
}

function CourseLink({
  course,
  searchParams,
}: {
  priority: boolean;
  course: Courses;
  searchParams: SearchParams;
}) {
  const noFilters = Object.values(searchParams).every((v) => v === undefined);

  return (
    <Link
      href={`/course/${course.id}?${stringifySearchParams(searchParams)}`}
      className="block transition ease-in-out md:hover:scale-105 h-full"
      prefetch={noFilters ? true : null}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="flex aspect-video items-center justify-center bg-muted">
          <BookOpen className="h-10 w-10 text-muted-foreground" />
        </div>
        <CardContent className="p-6 flex-grow">
          <h4 className="mb-2 text-lg font-semibold">{course.name}</h4>
          <p className="mb-4 text-sm text-muted-foreground line-clamp-3 overflow-hidden">
            {course.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
