import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types'

import {TitleBar} from '@/components/code-highlight/code-highlight'
import Link from 'nextwrap/link'

const Components : MDXComponents = {
  a: ({ href, children }) => <Link href={href}>{children}</Link>,
  titlebar: ({children, code, ...props}) => <TitleBar code={code} properties={props}>{children}</TitleBar>,
}

export default function PostView({title, code, raw}: {title:string, code: string, raw: string}) 
{
  const MDXComponent = useMDXComponent(code || '');

  return (
    <main>
      <p>-</p>
      <h1 className="text-3xl font-bold">{title}</h1>
      <MDXComponent components={Components} />
    </main>
  )
}
/**
 * for markdown
   <div dangerouslySetInnerHTML={{__html: postHtml}}/>
 */