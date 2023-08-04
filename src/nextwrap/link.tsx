import Link from "next/link"


export default ({children, href}: {children: React.ReactNode, href: string})=>{
  if( process.env.NODE_ENV == 'production')
  {
    return (
      <a href={`${process.env.BASE_PATH}${href}`}>{children}</a>
      )
  }
  else{
    return (
      <Link href={href}>
        {children}
      </Link>
    )
  }
}