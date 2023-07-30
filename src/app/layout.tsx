import React from 'react'
import { Metadata } from 'next'

import {ContextProvider} from "@/context/context"
import {SetInitialColorMode} from "utils/darkmode-helper"

import MastHead from "@/components/nav/masthead"
import SideBar from "@/components/sidebar/sidebar"
import Footer from "@/components/footer/footer"

import '@/styles/globals.scss'


 
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
        <ContextProvider>
          <MastHead/>      
          <SideBar/>
          {children}         
          <Footer/>     
        </ContextProvider>        
      </body>   
    </html>
  )
}