import { Sidebar, SidebarHeader, SidebarMenu, SidebarContent, SidebarFooter } from '@/components/ui/sidebar'
import React, { Suspense } from 'react'
import { UserNav } from './auth'
import { Data } from './data'

export const LessonSidebar = (props: {
  params: Promise<{
    id: string;
    lessonId: string;
  }>
}) => {
  return (
    <div>
      <Sidebar variant="floating" {...props}>
        <Suspense>
          <Data params={props.params} />
        </Suspense>
        <SidebarFooter>
          <Suspense>
            <UserNav />
          </Suspense>
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}

