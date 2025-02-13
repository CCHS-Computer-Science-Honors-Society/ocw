import React from 'react'
import { Reorder } from './_components/reorder'
import { LessonGrid } from '../../table/_table/lessons.grid'

export default function Page({
  params
}: {
  params: Promise<{
    unitId: string
    id: string
  }>
}) {
  return (
    <main className='w-full flex flex-col  container mx-auto'>
      <Reorder params={params} />
    </main>
  )
}

