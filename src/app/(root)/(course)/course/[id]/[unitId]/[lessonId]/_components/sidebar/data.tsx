import React from 'react'
import { getSidebarData } from '../../_queries';
import { LessonSidebar } from './sidebar';
import { Header } from './header';

export const Data = async ({

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
    <div className=''>
      <Header data={data} />
      <LessonSidebar data={data} courseId={courseId} />
    </div>
  )
}
