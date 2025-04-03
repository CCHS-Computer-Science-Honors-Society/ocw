"use client";

import Link from "next/link";
import { Suspense } from "react";
import { Menu } from "lucide-react"; // Import Menu icon

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle as nv,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button"; // Import Button
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose, // Import SheetClose for better UX
} from "@/components/ui/sheet"; // Import Sheet components
import { cn } from "@/lib/utils";
import Explore from "./explore-button";
import { SearchDropdownComponent } from "./search";
import { UserMenu } from "./user-menu";
import { ThemeSelector } from "./theme/theme-selector";

const navigationMenuTriggerStyle = cn(nv(), "text-primary");
const navItems = [
  { href: "/courses", label: "Courses" },
  { href: "/contributors", label: "Contributors" },
  {
    href: "/contribute",
    label: "Contribute",
  },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function Navbar({ isSearch }: { isSearch?: boolean }) {
  return (
    <nav className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Side: Logo, Explore, Desktop Nav */}
          <div className="flex items-center gap-4">
            {" "}
            {/* Adjusted gap */}
            <Link href="/" className="shrink-0">
              <span className="text-primary text-2xl font-bold">OCW</span>
            </Link>
            {/* Explore button remains visible on all screen sizes */}
            <Explore />
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.href}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle}
                        >
                          {item.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Right Side: Search, UserMenu, Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:gap-4">
            {" "}
            {/* Adjusted gap */}
            {/* Desktop Search */}
            <div className="hidden md:block">
              {isSearch ? <SearchDropdownComponent /> : null}
            </div>
            {/* User Menu (Always Visible) */}
            <Suspense fallback={<div>Loading...</div>}>
              {" "}
              {/* Simple text fallback */}
              <ThemeSelector />
            </Suspense>
            {/* Mobile Menu Trigger */}
            <div className="block md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-full max-w-xs sm:max-w-sm"
                >
                  {" "}
                  {/* Adjust width if needed */}
                  {/* Optional: Add a Sheet Header */}
                  {/* <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                    <SheetDescription>
                      Navigate the site.
                    </SheetDescription>
                  </SheetHeader> */}
                  {/* Mobile Search (if enabled) */}
                  <div className="py-4">
                    {isSearch ? <SearchDropdownComponent /> : null}
                  </div>
                  {/* Mobile Navigation Links */}
                  <nav className="flex flex-col space-y-2">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className="text-foreground hover:bg-accent hover:text-accent-foreground block rounded-md px-3 py-2 text-base font-medium"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  {/* Optional: Add a Sheet Footer */}
                  {/* <SheetFooter>
                    <p>Footer content</p>
                  </SheetFooter> */}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
