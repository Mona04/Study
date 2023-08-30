import Link from "next/link"


export default ({children, href, className}: {children: React.ReactNode, href: string | undefined, className?: string | undefined, })=>{
  if( process.env.NODE_ENV == 'production')
  {
    return (
      <a className={className} href={`${process.env.BASE_PATH}${href}`}>
        {children}
      </a>
    )
  }
  else{
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    )
  }
}