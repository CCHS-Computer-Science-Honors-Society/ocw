import { Sidebar, SidebarFooter } from '@/components/ui/sidebar'
import React, { Suspense } from 'react'
import { UserNav } from './auth'
import { LessonSidebarContent } from './content'

export const LessonSidebar = (props: {
  params: Promise<{
    id: string;
    lessonId: string;
  }>
}) => {
  return (
    <div>
      <Sidebar className='bg-white border-0 shadow-none' variant="floating" {...props}>
        <Suspense>
          <LessonSidebarContent params={props.params} />
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

