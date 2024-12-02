import React, { Suspense } from "react";
import { CourseList, CourseListSkeleton } from "./_components/courselist";
import Link from "next/link";
import { HeroSection } from "./_components/hero";

export default function Page() {
  return (
    <div className="w-full bg-muted/10">
      <main className="flex w-full flex-1 flex-col rounded-xl bg-white p-4 transition-all duration-300 ease-in-out">
        <div className="sm:py-42 py-52">
          <HeroSection />
        </div>
        <section className="container mx-auto px-4 pb-12">
          <Suspense fallback={<CourseListSkeleton />}>
            <CourseList />
          </Suspense>
        </section>

        {/* Footer */}
        <footer className="border-t bg-background py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
              {[
                {
                  title: "About Us",
                  content:
                    "OpenCourseWare is dedicated to providing free, high-quality education to learners worldwide.",
                },
                {
                  title: "Quick Links",
                  links: ["Home", "Courses", "About", "Contact"],
                },
                {
                  title: "Legal",
                  links: [
                    "Terms of Service",
                    "Privacy Policy",
                    "Cookie Policy",
                  ],
                },
                {
                  title: "Connect With Us",
                  links: ["Twitter", "Facebook", "LinkedIn", "Instagram"],
                },
              ].map((section, index) => (
                <div key={index}>
                  <h5 className="mb-4 text-lg font-semibold">
                    {section.title}
                  </h5>
                  {section.content && (
                    <p className="text-sm text-muted-foreground">
                      {section.content}
                    </p>
                  )}
                  {section.links && (
                    <nav className="space-y-2">
                      {section.links.map((link) => (
                        <Link
                          key={link}
                          href="#"
                          className="block text-sm text-muted-foreground hover:text-primary"
                        >
                          {link}
                        </Link>
                      ))}
                    </nav>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} OpenCourseware. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export const experimental_ppr = true;
