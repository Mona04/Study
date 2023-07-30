import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'File Not Fount',
  description: 'Invalid Route',
  other: {
    
  }
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <main>
      <div>
        404
      </div>
    </main>
  )
}