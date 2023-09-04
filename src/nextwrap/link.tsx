import Link from "next/link"


export default ({children, href, target = '_self', rel, className}: 
  {
    children: React.ReactNode,
    href: string | undefined, 
    target?: string | undefined,
    rel?: string | undefined,
    className?: string | undefined, }
  )=>{
  
  if(target == '_blank'){
    rel = 'noopener noreferrer';
  }

  if( process.env.NODE_ENV == 'production')
  {
    return (
      <a className={className} 
         href={`${process.env.BASE_PATH}${href}`} 
         rel={rel} 
         target={target}>
        {children}
      </a>
    )
  }
  else{
    return (
      <Link className={className}
            href={href === undefined ? "" : href} 
            rel={rel} 
            target={target}>
        {children}
      </Link>
    )
  }
}