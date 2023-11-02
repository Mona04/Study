import Link from "next/link"
import { MouseEventHandler } from "react";

interface Props {
  children: React.ReactNode,
  href: string | undefined, 
  target?: string | undefined,
  rel?: string | undefined,
  className?: string | undefined,
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
}

export default ({children, href, target = '_self', rel, className, onClick}:Props
  )=>{
  
  if(target == '_blank'){
    rel = 'noopener noreferrer';
  }

  if( process.env.NODE_ENV == 'development') // 실제 client 에서는 
  {
    return (
      <Link className={className}
            href={href === undefined ? "" : href} 
            rel={rel} 
            target={target}
            onClick={onClick}>
        {children}
      </Link>
    )
  }
  else{
    return (
      <a className={className} 
         href={`${process.env.NEXT_PUBLIC_BASE_PATH}${href}`} 
         rel={rel} 
         target={target}
         onClick={onClick}>
        {children}
      </a>
    )
  }
}