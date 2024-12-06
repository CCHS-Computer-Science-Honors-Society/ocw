import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-background">
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
      <div className="container relative z-10 mx-auto flex flex-col gap-5 px-4 text-center">
        <h2 className="mb-8 text-4xl font-extrabold text-foreground sm:text-5xl lg:text-6xl">
          Education with OpenCourseWare
        </h2>
        <div className="flex flex-row items-center justify-center gap-20">
          {[
            { value: "26", label: "Classes" },
            { value: "160", label: "Resources" },
            { value: "3,806", label: "Students" },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-primary sm:text-5xl">
                {stat.value}
              </span>
              <span className="text-md text-muted-foreground sm:text-lg">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button size="lg" className="rounded-full" asChild>
            <Link href="/courses">Explore Courses</Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full" asChild>
            <Link href="/resources">Browse Resources</Link>
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
  );
}
