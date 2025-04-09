import React from "react";
import { HeroSection } from "./_components/hero";

export default function Page() {
  return (
    <div className="bg-background/60 w-full">
      <main className="flex w-full flex-1 flex-col rounded-xl p-4 transition-all duration-300 ease-in-out">
        <div className="py-52 sm:py-42">
          <HeroSection />
        </div>
      </main>
    </div>
  );
}

export const experimental_ppr = true;
