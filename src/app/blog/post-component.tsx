import { useMDXComponent } from 'archivelayer';

import Link from 'nextwrap/link'

const Components : MDXComponents = {
  a: ({ href, children }) => <Link href={href}>{children}</Link>,
}

export function MDXPostView({content}: {content:string}) 
{ 
  const MDXComponent = useMDXComponent({code:content});

  return (
    <>
      <MDXComponent components={Components} />
    </>
  )
}

export function MDPostView({content}: {content:string}) 
{
  return (
    <>
      <div dangerouslySetInnerHTML={{__html: content}}/>
    </>
  )
}
