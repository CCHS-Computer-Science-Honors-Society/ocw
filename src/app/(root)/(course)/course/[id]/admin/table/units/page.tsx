import React from 'react'
import { Units } from '../_table/units'

export default function Page({
  params }: {
    params: Promise<{
      id: string;
    }>

  }) {
  return (
    <div>
      <Units params={params} />
    </div>
  )
}

