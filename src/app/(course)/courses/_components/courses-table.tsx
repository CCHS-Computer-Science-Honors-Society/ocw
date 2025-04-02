import Link from "next/link";
import { BookOpen } from "lucide-react";
import { eq, like, and } from "drizzle-orm";
import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/server/db";
import { courses } from "@/server/db/schema";

export async function CoursesGrid({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const { name, subjectId } = searchParams;

  const filteredCourses = await db
    .select()
    .from(courses)
    .where(
      and(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        name ? like(courses.name, `%${name}%`) : undefined,
        subjectId ? eq(courses.subjectId, subjectId as string) : undefined,
        eq(courses.isPublic, true),
      ),
    );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredCourses.map((course) => (
        <Link
          prefetch
          href={`/course/${course.id}`}
          key={course.id}
          className="transition-transform hover:scale-105"
        >
          <Card className="h-full overflow-hidden">
            <div className="flex aspect-video items-center justify-center bg-gray-100">
              <BookOpen className="h-10 w-10 text-gray-400" />
            </div>
            <CardContent className="p-6">
              <h4 className="mb-2 text-lg font-semibold text-gray-900">
                {course.name}
              </h4>
              <p className="line-clamp-3 text-sm text-gray-600">
                {course.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
