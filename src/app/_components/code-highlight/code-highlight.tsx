'use client'

import { useState, useRef } from 'react'
import { LuClipboardCopy } from 'react-icons/lu'

export function Copy(/*{children,}: {children: React.ReactNode}*/) {
  return  (    
    <div className='copy tw-flex tw-content-center  '>
      <LuClipboardCopy className='tw-self-center tw-text-lg tw-mr-2 '/>
      Copy Code
    </div>  
  );
}