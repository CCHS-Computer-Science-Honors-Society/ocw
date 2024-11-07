import React, { Suspense } from "react";
import { CourseList } from "./_components/course-list";
import { NavBar } from "@/components/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HomeTabs from "./_components/home-tabs";

export default function Page(props: {
  searchParams: Promise<{ catagory: string }>;
}) {
  return (
    <div className="w-full bg-muted/10">
      <main className="flex w-full flex-1 flex-col rounded-xl bg-white p-4 transition-all duration-300 ease-in-out">
        {/* Header */}
        <NavBar />

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background py-52">
          <div className="absolute inset-0 z-0">
            <svg
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="hero-pattern"
                  width="100"
                  height="100"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="1"
                    className="fill-current text-muted-foreground/10"
                  ></circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hero-pattern)"></rect>
            </svg>
          </div>
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h2 className="mb-6 text-5xl font-extrabold text-foreground">
              Make your life easier with OpenCourseWare
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-foreground/80">
              Explore our student created survival guides, notes, flashcards,
              and teach written lectures at OpenCourseWare
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="rounded-full">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Browse Courses
              </Button>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <svg
              width="800"
              height="800"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="opacity-30"
            >
              <defs>
                <linearGradient id="blob-gradient" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#FF6B6B" />
                  <stop offset="25%" stopColor="#4ECDC4" />
                  <stop offset="50%" stopColor="#45B7D1" />
                  <stop offset="75%" stopColor="#F3A953" />
                  <stop offset="100%" stopColor="#E84393" />
                </linearGradient>
              </defs>
              <path
                fill="url(#blob-gradient)"
                d="M37.5,-64.1C45.5,-55.3,47.1,-39.7,52.4,-26.4C57.7,-13.1,66.7,-2.1,69.2,10.5C71.7,23.1,67.6,37.3,58.8,47.7C50,58.1,36.5,64.7,22.8,68.1C9.1,71.5,-4.7,71.6,-17.8,68C-30.9,64.4,-43.2,57.1,-52.6,47C-62,36.9,-68.5,24,-71.8,9.8C-75.1,-4.4,-75.2,-20,-69.7,-33.5C-64.2,-47,-53,-58.4,-40.2,-65.1C-27.4,-71.8,-13.7,-73.8,0.8,-75C15.3,-76.2,29.5,-72.8,37.5,-64.1Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>
        </section>
        <div className="flex flex-row items-start justify-between">
          <HomeTabs />
        </div>

        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={"loading"}>
              <CourseList searchParams={props.searchParams} />
            </Suspense>
          </div>
        </div>

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
