"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useParams } from "next/navigation";

function getData(id: string) {
  return {
    navMain: [
      {
        title: "Overview",
        url: `/course/${id}/admin`,
      },
      {
        title: "Users",
        url: `/course/${id}/admin/users`,
      },
      {
        title: "Settings",
        url: `/course/${id}/admin/settings`,
      },
    ],
  };
}

export function MainNav() {
  const { id } = useParams();
  const data = getData(id as string);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {data.navMain.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
