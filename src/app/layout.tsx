import React from 'react'
import { Metadata } from 'next'

import { ContextProvider } from "@/context/context"
import { SetInitialColorMode } from "utils/darkmode-helper"

import MastHead from "@/components/nav/masthead"
import SideBar from "@/components/sidebar/sidebar"
import Search from "@/components/search/search"
import Footer from "@/components/footer/footer"

import '@/styles/global.scss'
 
export const metadata: Metadata = {
  title: '...',
  description: '...',
  other: {
    
  }
}

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="en" >        
      <body>
        <script dangerouslySetInnerHTML={{__html: SetInitialColorMode }}></script>
        <link rel='stylesheet' href='//fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap'/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css" integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC" crossOrigin="anonymous"/>
        
        {/* to make footer stick to the bottom */}
        <div id="wrap" className='tw-min-h-screen tw-relative tw-bg-color-page-background'>
          <ContextProvider>
            <MastHead/>

            <SideBar/>
            <Search/>
            
            <div className='tw-mt-nav-height tw-pb-20'>
              {children}
            </div>

            <Footer className='tw-w-full tw-absolute tw-bottom-0'/>
          </ContextProvider>
        </div>
      </body>   
    </html>
  )
}