import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import React from "react";

export async function CourseList(props: {
  searchParams: Promise<{ catagory: string }>;
}) {
  const catagory = (await props.searchParams).catagory as CATAGORY_ENUM;

  const data = await getCourses({
    catagory: catagory,
  });

  return (
    <div>
      {data.map((course) => (
        <Link href={`/course/${course.id}`} key={course.id}>
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
      ))}
    </div>
  );
}
