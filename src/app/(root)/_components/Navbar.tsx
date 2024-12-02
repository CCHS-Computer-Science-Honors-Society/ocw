"use client";

import type { MainNavItem } from "@/types";

import { MainNav } from "./main-nav";
import { SearchDropdownComponent } from "@/components/search";

interface NavBarProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
  scroll?: boolean;
}

export function Navbar({ items, children, scroll = false }: NavBarProps) {
  const scrolled = false;

  return (
    <header
      className={`h-max-[100px] sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? "border-b" : "bg-background/0") : "border-b"
      }`}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <MainNav items={items}>{children}</MainNav>

        <div className="flex items-center space-x-3">
          <SearchDropdownComponent />
        </div>
      </div>
    </header>
  );
}
