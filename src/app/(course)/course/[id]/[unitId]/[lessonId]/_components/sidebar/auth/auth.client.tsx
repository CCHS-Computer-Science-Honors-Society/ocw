"use client";

import {
  useSidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, LogOut } from "lucide-react";
import Link from "next/link";

export function AuthClient({
  user,
}: {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}) {
  const { isMobile } = useSidebar(); // Hook works if inside SidebarProvider

  return (
    // This structure seems fine according to the docs
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* Use library button */}
            <SidebarMenuButton
              size="lg" // Keep size if desired
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground rounded-lg">
                  {user?.name?.charAt(0).toUpperCase() ?? "?"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="text-sidebar-foreground truncate font-semibold">
                  {user.name ?? "User"}
                </span>
                <span className="text-sidebar-foreground/80 truncate text-xs">
                  {user.email ?? "No email"}
                </span>
              </div>
              <ChevronsUpDown className="text-sidebar-foreground/80 ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            // Use sidebar variables for consistency
            className="bg-sidebar-background border-sidebar-border text-sidebar-foreground min-w-[var(--radix-dropdown-menu-trigger-width)] rounded-lg shadow-md"
            side={isMobile ? "top" : "right"} // Adjusted side for footer
            align="end"
            sideOffset={8} // Increased offset slightly
          >
            {/* Label can be simplified or styled */}
            <DropdownMenuLabel className="text-sidebar-foreground/80 px-2 py-1.5 text-xs font-normal">
              Signed in as
            </DropdownMenuLabel>
            <div className="mb-1 flex items-center gap-2 px-2 pt-0 pb-1.5 text-left text-sm">
              <Avatar className="h-7 w-7 rounded-md">
                <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
                <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground rounded-md">
                  {user?.name?.charAt(0).toUpperCase() ?? "?"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="text-sidebar-foreground truncate font-medium">
                  {user.name ?? "User"}
                </span>
                <span className="text-sidebar-foreground/80 truncate text-xs">
                  {user.email ?? "No email"}
                </span>
              </div>
            </div>
            <DropdownMenuSeparator className="bg-sidebar-border" />
            {/* Ensure Link fills the item for clickability */}
            <DropdownMenuItem
              asChild
              className="focus:bg-sidebar-accent focus:text-sidebar-accent-foreground cursor-pointer"
            >
              <Link href={"/logout"} className="flex items-center">
                <LogOut className="mr-2 size-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
