'use client'

import { useState, useRef } from 'react'
import { LuClipboardCopy } from 'react-icons/lu'

export function Copy({code}:{code:string}/*{children,}: {children: React.ReactNode}*/) {
  console.log(code)

  const onClick = async () => {
    await navigator.clipboard.writeText(code);
  }

  return  (    
    <button className='copy tw-flex tw-content-center  '
            onClick={onClick}>
      <LuClipboardCopy className='tw-self-center tw-text-lg tw-mr-2 '/>
      Copy Code
    </button>  
  );
}