import * as React from 'react'
import { Metadata } from 'next'
import DarkModeToggle from '@/components/darkmode-toggle'
import BlogSearch from '@/components/blog-search'


const TestPage = () => {
  // const data = await fetch('../aaa.json');
  //alert(data);
  return (
    <main>
      <h1>Test Page</h1>
      <p>한글rhk 컴퓨터</p>

      <DarkModeToggle/>
      <BlogSearch/>
    </main>
  )
}

export const metadata: Metadata = {
  title: 'My Page Title',
  icons: '/favicon.ico'
}

export default TestPage