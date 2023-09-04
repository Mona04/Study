'use client'

import { useState, useRef } from 'react'
import { LuClipboardCopy, LuCheck } from 'react-icons/lu'
import { copyToClipboard } from 'utils/utils';

export function TitleBar({children, code, ...props}: {children?: React.ReactNode[], code: string, properties: any}){
  const [isCopied, setIsCopied] = useState(false);

  const onClick = async () => {   
    await copyToClipboard(code);
    setIsCopied(true); 
    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  }

  return (
    <div data-rehype-pretty-code-title='' 
         data-theme={props.properties['data-theme']}
         data-language={props.properties['data-language']}>
      <div className='tw-text-left tw-ml-4'>{children}</div>
      <button className='tw-flex tw-content-center tw-ml-auto tw-mr-4'
              onClick={onClick}>
        {
          isCopied ? 
          <>
            <LuCheck className='tw-self-center tw-text-lg tw-mr-2 '/>
            Copied!
          </>
          :
          <>
            <LuClipboardCopy className='tw-self-center tw-text-lg tw-mr-2 '/>
            Copy Code
          </>
        }
      </button>  
    </div>
  )
}