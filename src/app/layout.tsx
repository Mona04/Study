import React from 'react'
import { Metadata } from 'next'

import { ContextProvider }     from "@/context/context"
import { SetInitialColorMode } from "utils/darkmode-helper"
import { CopyButtonScript, CopyButtonScriptor }    from "utils/markdown-helper"
import { getBasePath }         from "utils/utils"

import MastHead        from "@/components/nav/masthead"
import Footer          from "@/components/footer/footer"
import SideBar         from "@/components/popup/sidebar/sidebar"
import Search          from "@/components/popup/search/search"
import PopupBackground from '@/components/popup/popup-background'

import '@/styles/global.scss'
 
export const metadata: Metadata = {
  title: '...',
  description: '...',
  icons: `${getBasePath()}/favicon.ico`,
  authors: {
    name: "Mona04",
    url: "moksha1905@gmail.com",
  },
  metadataBase: new URL("https://mona04.github.io/study-log/"),
  other: {
    
  }
}

export default function RootLayout({children,}: {children: React.ReactNode})
{
  return (
    <html lang="en" >        
      
      {/* to make footer stick to the bottom */}
      <body className='tw-relative tw-min-h-screen tw-bg-color-page-background'>

        <script dangerouslySetInnerHTML={{__html: SetInitialColorMode }}></script> 

        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Noto+Sans&family=Noto+Sans+KR&display=swap'/>
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Gothic+A1&display=swap'/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css" integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC" crossOrigin="anonymous"/>

        <ContextProvider>
          <MastHead/>
         
          {/* popups */}
          <PopupBackground/>
          <SideBar/>
          <Search/>
            
          {/* ensure that the content does not hide the masthead and footer.  */}
          <main className='tw-mt-nav-height tw-pb-52'>
            {children}
          </main>

          <Footer className='tw-absolute tw-w-full -tw-bottom-20'/>
        </ContextProvider>
   
        {/* After React DOM is loaded. cf. defer has no effect on script tags without src attribute. */}
        <CopyButtonScriptor/>
      </body>   
    </html>
  )
}
//<script dangerouslySetInnerHTML={{__html: CopyButtonScript }} defer />