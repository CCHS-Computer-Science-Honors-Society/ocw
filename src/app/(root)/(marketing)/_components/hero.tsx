import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-background">
      <div className="container relative z-auto mx-auto flex flex-col gap-5 px-4 text-center">
        <Image
          className="relative z-auto mx-auto"
          src="https://ugakd4mkxv.ufs.sh/f/QRXW6mPDvNgcODJnurmfb52Q6NjpkM7THVhzLqitUSY9d4rf"
          width={200}
          height={200}
          alt="Creek Logo"
        ></Image>
        <h2 className="mb-8 text-4xl font-extrabold text-foreground sm:text-5xl lg:text-6xl">
          Education with OpenCourseWare
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
        <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button size="lg" className="rounded-full bg-[#8b0000]" asChild>
            <Link href="/courses">See All Courses</Link>
          </Button>
          <Button
            size="lg"
            // variant="outline"
            className="rounded-full bg-[#8b0000]"
            asChild
          >
            <Link href="/resources">Browse Resources</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
