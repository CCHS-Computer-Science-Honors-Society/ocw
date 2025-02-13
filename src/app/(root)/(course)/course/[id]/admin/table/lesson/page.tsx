import React, { Suspense } from 'react'
import { LessonGrid } from '../_table/lessons.grid'
import { LessonTableSkeleton } from '../_table/lesson.grid.skeleton';
import { HydrateClient } from '@/trpc/server';

export default function Page({
  params
}: {
  params: Promise<{
    id: string;
  }>
}) {

  return (
    <HydrateClient>

      <Suspense fallback={<LessonTableSkeleton />}>
        <LessonGrid params={params} />
      </Suspense>
    </HydrateClient>
  )
}

export const experimental_ppr = true;
