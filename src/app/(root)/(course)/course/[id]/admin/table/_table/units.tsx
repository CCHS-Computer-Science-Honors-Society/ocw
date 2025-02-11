import React from 'react'
import { UnitTable } from './column';

export const Units = async ({
  params
}: {
  params: Promise<{
    id: string;
  }>
}) => {
  const id = (await params).id

  return (
    <div>
      <UnitTable id={id} />
    </div>
  )
}
