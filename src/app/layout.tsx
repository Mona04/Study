import { Metadata } from 'next'
import MastHead from "@/components/masthead"
import SideBar from "@/components/sidebar"
import {SetInitialColorMode} from "utils/ssr-helper"
import '@/styles/globals.scss'

 
export const metadata: Metadata = {
  title: '...',
  description: '...',
  other: {
    
  }
}

export default function RootLayout(
  {children,}: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" >        
        <body>
          <script
            dangerouslySetInnerHTML={{
            __html: SetInitialColorMode
          }}></script>
          <SideBar/>
          <MastHead/>
          <main>
            {children}
          </main>
        </body>   
      </html>
    )
  }