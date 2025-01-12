import Navbar from '@/components/navbar'
import { UserMenu } from '@/components/user-menu'
import React, { Suspense } from 'react'

export default function Layout({
  children }: {
    children: React.ReactNode
  }) {
  return (
    <div>
      <Navbar
        userNav={
          <Suspense fallback="loading">
            <UserMenu />
          </Suspense>
        }
      />
      {children}
    </div>

  )
}

