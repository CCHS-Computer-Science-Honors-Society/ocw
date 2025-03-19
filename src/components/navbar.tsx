"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import Explore from "./explore-button";
import { SearchDropdownComponent } from "./search";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

function Navbar({
  userNav,
  isSearch,
}: {
  userNav: React.ReactNode;
  isSearch?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border bg-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-1">
            <Link href="/" className="flex-shrink-0 pr-8">
              <span className="text-2xl font-bold text-primary">OCW</span>
            </Link>
            <Explore />

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/courses" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Courses
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/contributors" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Contributors
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/contact" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Contact
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>OCW Navigation</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-4 pt-4">
                    <Link
                      href="/courses"
                      className="text-base font-medium transition-colors hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      Courses
                    </Link>
                    <Link
                      href="/contributors"
                      className="text-base font-medium transition-colors hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      Contributors
                    </Link>
                    <Link
                      href="/about"
                      className="text-base font-medium transition-colors hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="text-base font-medium transition-colors hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      Contact
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              {isSearch ? <SearchDropdownComponent /> : null}
            </div>
            <div className="ml-4 flex items-center md:ml-6">{userNav}</div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
