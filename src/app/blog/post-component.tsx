import { useMDXComponent } from 'archivelayer/hooks';

import Link from 'nextwrap/link'


export function MDXPostView({content}: {content:string}) 
{ 
  const MDXComponent = useMDXComponent({code:content}, {});

  return (
    <>
      {MDXComponent}
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
