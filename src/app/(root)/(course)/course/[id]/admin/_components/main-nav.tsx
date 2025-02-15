"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight, Cog } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { z } from "zod";

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

const paramsSchema = z.object({
  id: z.string(),
});

export function MainNav() {
  const { id } = useParams();
  const { id: idParsed } = paramsSchema.parse({ id });
  const data = getData(idParsed);

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
        <Collapsible asChild className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={"Tables"}>
                <span>Tables</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem key={"Units"}>
                  <SidebarMenuSubButton asChild>
                    <Link href={`/course/${idParsed}/admin/table/units`}>
                      <span>Units</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem key={"Lessons"}>
                  <SidebarMenuSubButton asChild>
                    <Link href={`/course/${idParsed}/admin/table/lesson`}>
                      <span>Lesson</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
