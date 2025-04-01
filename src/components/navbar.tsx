"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle as nv,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Explore from "./explore-button";
import { SearchDropdownComponent } from "./search";
import { cn } from "@/lib/utils";
import { UserMenu } from "./user-menu";
import { Suspense } from "react";

const navigationMenuTriggerStyle = cn(nv(), "text-primary");

function Navbar({ isSearch }: { isSearch?: boolean }) {
  return (
    <nav className="border bg-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-1">
            <Link href="/" className="flex-shrink-0 pr-8">
              <span className="text-2xl font-bold text-primary">OCW</span>
            </Link>
            <Explore />

            <div className="hidden md:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/courses" prefetch legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle}
                      >
                        Courses
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/contributors" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle}
                      >
                        Contributors
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/about" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle}
                      >
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/contact" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle}
                      >
                        Contact
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              {isSearch ? <SearchDropdownComponent /> : null}
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <Suspense fallback="loading">
                <UserMenu />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
