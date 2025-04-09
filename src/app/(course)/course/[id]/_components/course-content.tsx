import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@/components/ui/link";
import { getCourseById } from "@/server/api/scripts";
import { notFound } from "next/navigation";

export const CourseContent = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await props.params).id;

  const course = await getCourseById(id);

  if (!course) {
    return notFound();
  }
  return (
    <div className="flex flex-1">
      {/* Sidebar */}
      <div className="bg-background hidden border-r p-6 lg:block lg:w-96">
        <div className="bg-primary/10 mb-6 rounded-lg p-4">
          <h2 className="text-primary/80 text-xl font-bold">{course.name}</h2>
          <p className="text-primary/60 mt-1 text-sm">
            {course.units.length} UNITS
          </p>
        </div>
        <div className="ml-4 max-w-[calc(100%-2rem)] space-y-4">
          {course.units.map((unit, index) => (
            <div key={index} className="text-sm">
              <div className="mb-1 text-gray-500">UNIT {index + 1}</div>
              <Link
                href={`/course/${course.id}/${unit.id}`}
                prefetch
                className="break-words text-[#1e3a7b] hover:underline"
              >
                {unit.name}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 pt-8">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">{course.name}</h1>
        <div className="gap-10">
          {course.units.map((unit) => (
            <div key={unit.id} className="py-1">
              <Accordion type="single" collapsible>
                <AccordionItem value="unit-1" className="rounded-lg border">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                        {course.units.indexOf(unit) + 1}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{unit.name}</div>
                        <div className="text-sm text-gray-500"></div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-16">
                    <div className="space-y-3 py-2">
                      {unit.lessons.map((lesson, index) => (
                        <Link
                          prefetch
                          key={index}
                          href={`/course/${course.id}/${unit.id}/${lesson.id}`}
                          className="text-primary/20 block hover:underline"
                        >
                          {lesson.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
