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
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
      {!courses?.length ? (
        <p className="text-center text-muted-foreground col-span-full">
          No courses found.
        </p>
      ) : (
        courses.map((course, index) => (
          <CourseLink
            key={course.id}
            priority={index < 10}
            course={course}
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

  let noFilters = Object.values(searchParams).every((v) => v === undefined);

  return (
    <Link
      href={`/course/${course.id}?${stringifySearchParams(searchParams)}`}

      className="block transition ease-in-out md:hover:scale-105"
      prefetch={noFilters ? true : null}
    >
      <div>
        <Card className="overflow-hidden">
          <div className="flex aspect-video items-center justify-center bg-muted">
            <BookOpen className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardContent className="p-6">
            <h4 className="mb-2 text-lg font-semibold">{course.name}</h4>
            <p className="mb-4 text-sm text-muted-foreground">
              {course.description}
            </p>
          </CardContent>
        </Card>
      </div>
    </Link>

  );
}
