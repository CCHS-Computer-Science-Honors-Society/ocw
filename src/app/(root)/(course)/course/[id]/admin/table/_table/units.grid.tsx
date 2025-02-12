import React from 'react'
import { UnitTable } from './units.grid.client';

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
