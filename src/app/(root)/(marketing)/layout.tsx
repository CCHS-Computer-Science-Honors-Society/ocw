import Link from "next/link";
import React from "react";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
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
                links: ["Terms of Service", "Privacy Policy", "Cookie Policy"],
              },
              {
                title: "Connect With Us",
                links: ["Twitter", "Facebook", "LinkedIn", "Instagram"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h5 className="mb-4 text-lg font-semibold">{section.title}</h5>
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
    </div>
  );
}
