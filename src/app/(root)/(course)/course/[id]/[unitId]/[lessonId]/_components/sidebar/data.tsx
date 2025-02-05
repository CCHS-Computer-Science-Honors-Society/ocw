import React from 'react'
import { getSidebarData } from '../../_queries';
import { LessonSidebar } from './sidebar';
import { Header } from './header';
import { Separator } from '@/components/ui/separator';

export const LessonSidebarContent = async ({

  params
}: {
  params: Promise<{
    id: string;
    lessonId: string;
  }>;

}) => {
  const courseId = (await params).id;
  const data = await getSidebarData(courseId);
  return (
    <>
      <Header data={data} />
      <Separator className='' orientation='horizontal' />
      <LessonSidebar data={data} courseId={courseId} />
    </>
  )
}
