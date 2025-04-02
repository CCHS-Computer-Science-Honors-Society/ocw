import FooterSections from "@/components/footer";
import Navbar from "@/components/navbar";
import { Timestamp } from "@/components/timestamp";
import React from "react";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar isSearch />
      {children}
      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            <FooterSections />
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            © <Timestamp /> OpenCourseware. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export const experimental_ppr = true;
