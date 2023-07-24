'use client'

import * as React from 'react'
import { Metadata } from 'next'
import * as Utils from "utils/ssr-helper"
import DarkModeToggle from '@/components/darkmode-toggle'
import BlogSearch from '@/components/blog-search'


const TestPage = () => {
  // const data = await fetch('../aaa.json');
  //alert(data);
  return (
    <main>
      <h1>Test Page</h1>


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