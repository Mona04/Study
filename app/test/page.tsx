'use client'

import * as React from 'react'
import { Metadata } from 'next'
import * as Utils from "utils/ssr-helper"
import DarkModeToggle from '@/components/darkmode-toggle'


const TestPage = () => {
  // const data = await fetch('../aaa.json');
  //alert(data);
  return (
    <main>
      <h1>Test Page</h1>


      <DarkModeToggle/>
  
    </main>
  )
}

export const metadata: Metadata = {
  title: 'My Page Title',
  icons: '/favicon.ico'
}

export default TestPage