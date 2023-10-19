import React from 'react'
import { Metadata } from 'next'

import { ContextProvider } from "@/context/context"
import { SetInitialColorMode } from "utils/darkmode-helper"
import { CopyButtonScript } from "utils/markdown-helper"

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

            {/* popups */}
            <SideBar/>
            <Search/>
            
            {/* ensure that the content does not hide the masthead and footer.  */}
            <div className='tw-mt-nav-height tw-pb-52'>
              {children}
            </div>

            <Footer className='tw-w-full tw-absolute tw-bottom-0'/>
          </ContextProvider>
        </div>

        {/* After React DOM is loaded. cf. defer has no effect on script tags without src attribute. */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
        <script dangerouslySetInnerHTML={{__html: CopyButtonScript }} defer />

      </body>   
    </html>
  )
}