import Script from 'next/script'
import MastHead from "@/components/masthead"
import '@/styles/globals.scss'


export default function RootLayout(
  {children,}: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
          <MastHead/>
          {children}
       
        </body>
        <Script 
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.getAttribute('data-theme') === 'dark' ? document.documentElement.setAttribute('data-theme', 'dark') : document.documentElement.setAttribute('data-theme', 'light')`
          }}
        />
      </html>
    )
  }