import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative h-[38vh]">
      <div className="relative z-auto container mx-auto flex flex-col gap-5 px-4 text-center">
        <h2 className="text-foreground mb-8 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
          Your Life At Creek Made Easy
        </h2>
        <div className="flex flex-row items-center justify-center gap-20">
          {[
            { value: "26", label: "Classes" },
            { value: "1000+", label: "Resources" },
            { value: "3800+", label: "Students" },
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-2xl font-bold sm:text-5xl">
                {stat.value}
              </span>
              <span className="text-md text-muted-foreground sm:text-lg">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button size="lg" className="" asChild>
            <Link prefetch href="/courses">
              See All Courses
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="" asChild>
            <Link href="/about">Learn About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
