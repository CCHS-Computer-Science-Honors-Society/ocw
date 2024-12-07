import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { notFound } from "next/navigation";
import { getCourseById } from "@/server/api/scripts";
import { type Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { UserMenu } from "@/components/user-menu";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}): Promise<Metadata> {
  const id = (await params).id;

  const course = await getCourseById(id);

  if (!course) {
    return notFound();
  }

  return {
    title: course.name,
    description: course.description,
    openGraph: {
      title: course.name,
      description: course.description,
      images: [...course.imageUrl],
    },
  };
}

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
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <Navbar
        userNav={
          <Suspense fallback="loading">
            <UserMenu />
          </Suspense>
        }
      />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden border-r bg-white p-6 lg:block lg:w-96">
          <div className="mb-6 rounded-lg bg-blue-100 p-4">
            <h2 className="text-xl font-bold text-blue-800">{course.name}</h2>
            <p className="mt-1 text-sm text-blue-600">
              {course.units.length} UNITS
            </p>
          </div>
          <div className="ml-4 max-w-[calc(100%-2rem)] space-y-4">
            {course.units.map((unit, index) => (
              <div key={index} className="text-sm">
                <div className="mb-1 text-gray-500">UNIT {index + 1}</div>
                <Link
                  href={`/course/${course.id}/${unit.id}`}
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
          <h1 className="mb-6 text-3xl font-bold text-gray-900">
            {course.name}
          </h1>
          <div className="gap-10">
            {course.units.map((unit) => (
              <div key={unit.id} className="py-1">
                <Accordion type="single" collapsible>
                  <AccordionItem value="unit-1" className="rounded-lg border">
                    <AccordionTrigger className="px-4 hover:no-underline">
                      <div className="flex items-center gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
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
                            key={index}
                            href={`/course/${course.id}/${unit.id}/${lesson.id}`}
                            className="block text-[#1e3a7b] hover:underline"
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
    </div>
  );
}

export const experimental_ppr = true;
