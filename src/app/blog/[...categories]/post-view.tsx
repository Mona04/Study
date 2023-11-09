import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types'

import { BlogPost } from 'utils/content-helper'
import Link from 'nextwrap/link'
import TOCView from '@/components/toc/toc'

const Components : MDXComponents = {
  a: ({ href, children }) => <Link href={href}>{children}</Link>,
}

function MDPostView({post}: {post:BlogPost}) 
{

  return (
    <>
      <div dangerouslySetInnerHTML={{__html: post.content}}/>
    </>
  )
}

function MDXPostView({post}: {post:BlogPost}) 
{ 
  const MDXComponent = useMDXComponent(post.content || '');

  return (
    <>
      <MDXComponent components={Components} />
    </>
  )
}


export default function PostView({post}: {post:BlogPost}) 
{

  return (
    <article>
      <meta itemProp='headline' content={post.title}/>
      <meta itemProp='description' content={post.description}/>
      <meta itemProp='datePublished' content={post.date}/>      
      
      <TOCView mdSrc={post.raw}/>
      
      <h1 className="tw-text-4xl tw-font-bold">{post.title}</h1>
      <div className=''>
      {
        post.isMDX ? <MDXPostView post={post}/> : <MDPostView post={post}/>
      }
      </div>

    </article>
  )
}
