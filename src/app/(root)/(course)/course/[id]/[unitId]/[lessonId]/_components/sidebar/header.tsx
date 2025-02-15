import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BookIcon } from "lucide-react";
import React from "react";
import { type SidebarData } from "../../_queries";

export const Header = ({ data }: { data: SidebarData }) => {
  return (
    <SidebarHeader className="p-5">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="" asChild disabled>
            <div>
              <div className="flex aspect-square size-20 items-center justify-center rounded-xl">
                <BookIcon className="size-10" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="text-lg font-semibold">
                  {data[0]?.course.name}
                </span>
                <span className="">{data[0]?.course.subjectId}</span>
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
