import Image from "next/image";
import { BarChart, BookIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { notFound } from "next/navigation";
import { getCourseById } from "@/server/api/scripts";

export default async function CoursePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { id } = params;

  const course = await getCourseById(id);

  if (!course) {
    return notFound();
  }

  return (
    <div className="min-h-screen w-full bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          <div className="space-y-6">
            <div className="relative h-64 overflow-hidden rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg md:h-96">
              <Image
                src={course.imageUrl}
                quality={5}
                alt={course.name}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
            <h1 className="text-3xl font-bold">{course.name}</h1>
            <div className="flex flex-row items-start gap-10">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <BookIcon className="mr-1 h-4 w-4" />
                  {course?.units.length}
                </div>
                <div className="flex items-center">
                  <BarChart className="mr-1 h-4 w-4" />
                  {course.subjectId}
                </div>
              </div>
              <p>-</p>

              <p className="text-muted-foreground">{course.description}</p>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Course Content</h2>
              <Accordion type="single" collapsible className="w-full">
                {course.units.map((unit) => (
                  <AccordionItem key={unit.id} value={unit.id}>
                    <AccordionTrigger className="text-left">
                      <span className="flex items-center">{unit.name}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-inside list-disc space-y-2">
                        {unit.lessons.map((lesson) => (
                          <li key={lesson.id}>
                            <a
                              href={`/course/${course.id}/${unit.id}/${lesson.id}`}
                              className="block text-sm text-muted-foreground hover:text-primary"
                            >
                              {lesson.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
