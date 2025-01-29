import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { BookIcon } from 'lucide-react'
import React from 'react'
import { SidebarData } from '../../_queries';

export const Header = ({
  data
}: {
  data: SidebarData;
}) => {
  return (
    <SidebarHeader className='p-5'>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <a href="#" className=''>
              <div className="flex rounded-xl size-16 items-center justify-center bg-sidebar-primary text-sidebar-primary-foreground">
                <BookIcon className="size-8" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight p-5">
                <span className="truncate font-semibold text-2xl">{data[0]?.name}</span>
                <span className="truncate text-lg">{data[0]?.course.subjectId}</span>
              </div>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
