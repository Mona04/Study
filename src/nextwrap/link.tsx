import Link from "next/link"
import { MouseEventHandler } from "react";
import { getBasePath } from "utils/utils"

interface Props {
  children: React.ReactNode,
  href: string | undefined, 
  target?: string | undefined,
  rel?: string | undefined,
  className?: string | undefined,
  key?: string | undefined,
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
}

export default ({children, href, target = '_self', rel, className, key, onClick}:Props
  )=>{
  
  if(target == '_blank'){
    rel = 'noopener noreferrer';
  }

  if(true||process.env.NODE_ENV == 'development') // 실제 client 에서는 context 가 맛이감
  {
    return (
      <Link className={className}
            key={key}
            href={href === undefined ? "" : href} 
            rel={rel} 
            target={target}
            onClick={onClick} 
            prefetch={false} // ssr 라 그런가 Error: Connection closed. 로 고장남.
            >
        {children}
      </Link>
    )
  }
  else{
    return (
      <a className={className} 
         key={key}
         href={`${getBasePath()}${href}`} 
         rel={rel} 
         target={target}
         onClick={onClick}>
        {children}
      </a>
    )
  }
}