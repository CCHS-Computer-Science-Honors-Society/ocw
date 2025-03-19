import React from "react";
import { HeroSection } from "./_components/hero";

export default function Page() {
  return (
    <div className="w-full bg-muted/10">
      <main className="flex w-full flex-1 flex-col rounded-xl bg-white p-4 transition-all duration-300 ease-in-out">
        <div className="sm:py-42 py-52">
          <HeroSection />
        </div>
      </main>
    </div>
  );
}
