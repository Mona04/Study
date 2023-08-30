
import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types'

import Link from 'nextwrap/link'
import Pre from 'utils/code-highlight/code-highlight'

const Components : MDXComponents = {
  a: ({ href, children }) => <Link href={href}>{children}</Link>,
  //pre: ({ children }) => <div>{children}</div>
  copy: ({childrent}) => <div>asdf</div>
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