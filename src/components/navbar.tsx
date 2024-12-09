"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchDropdownComponent } from "./search";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { VercelTabs } from "./ui/vercel-tabs";

const navItems = [
  { label: "Courses", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contributors", href: "/contributors" },
];

// can't nest server components inside cilent components unless you pass in as props'
function Navbar({ userNav }: { userNav: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="border bg-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">OCW</span>
            </Link>
            <div className="hidden md:block">
              <VercelTabs dataButtons={navItems} />
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <SearchDropdownComponent />
            </div>
            <div className="ml-4 flex items-center md:ml-6">{userNav}</div>
            <div className="-mr-2 flex md:hidden">
              <Button
                variant="ghost"
                className="inline-flex items-center justify-center rounded-md p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">
                  {isMobileMenuOpen ? "Close main menu" : "Open main menu"}
                </span>
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-gray-200 pb-3 pt-4">
            <div className="px-2">
              <SearchDropdownComponent />
            </div>
            <div className="mt-3 px-2">{userNav}</div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}

export default memo(Navbar);
