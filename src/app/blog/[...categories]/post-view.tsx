import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types'

import { BlogPost } from 'utils/content-helper'
import Link from 'nextwrap/link'

const Components : MDXComponents = {
  a: ({ href, children }) => <Link href={href}>{children}</Link>,
}

function MDPostView({post}: {post:BlogPost}) 
{

  return (
    <>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div dangerouslySetInnerHTML={{__html: post.content}}/>
    </>
  )
}

function MDXPostView({post}: {post:BlogPost}) 
{ 
  const MDXComponent = useMDXComponent(post.content || '');

  return (
    <>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <MDXComponent components={Components} />
    </>
  )
}


export default function PostView({post}: {post:BlogPost}) 
{

  return (
    <main>
      {
        post.isMDX ? <MDXPostView post={post}/> : <MDPostView post={post}/>
      }
    </main>
  )
}
