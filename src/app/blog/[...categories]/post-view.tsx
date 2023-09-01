
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types'

import {Copy} from '@/components/code-highlight/code-highlight'
import Link from 'nextwrap/link'

const Components : MDXComponents = {
  a: ({ href, children }) => <Link href={href}>{children}</Link>,
  title: ({ children }) => <div className='title'>{children}</div>,
  copy: ({children}) => <Copy code={children}/>
}

export default function PostView({title, code, raw}: {title:string, code: string, raw: string}) {
  const MDXComponent = useMDXComponent(code || '');
  return (
    <main>
      <h1 className="text-3xl font-bold">{title}</h1>
      <MDXComponent components={Components}/>
    </main>
  )
}
/**
 * for markdown
   <div dangerouslySetInnerHTML={{__html: postHtml}}/>
 */