import { useMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types'
import { BlogPost } from 'utils/content-helper'
import { getBasePath } from "utils/utils"

import Link from 'nextwrap/link'
import TOCView from '@/components/toc/toc'

const Components : MDXComponents = {
  a: ({ href, children }) => <Link href={href}>{children}</Link>,
}

/**
 * contentlayer 는 캐시를 쓰므로 컴파일 단계에서 링크를 바꿔놔야함.
 * @param content 
 * @returns 
 */
function postProcessContent(content: string) {
  return content.replaceAll("PUBLIC_BASE_PATH", getBasePath());
}

function MDPostView({content}: {content:string}) 
{

  return (
    <>
      <div dangerouslySetInnerHTML={{__html: content}}/>
    </>
  )
}

function MDXPostView({content}: {content:string}) 
{ 
  const MDXComponent = useMDXComponent(content);

  return (
    <>
      <MDXComponent components={Components} />
    </>
  )
}


export default function PostView({post}: {post:BlogPost}) 
{
  const content = postProcessContent(post.content)

  return (
    <article>
      <meta itemProp='headline' content={post.title}/>
      <meta itemProp='description' content={post.description}/>
      <meta itemProp='datePublished' content={post.date}/>      
      
      <TOCView mdSrc={post.raw}/>
      
      <h1 className="tw-text-4xl tw-font-bold">{post.title}</h1>
      <div className=''>
      {
        post.isMDX ? <MDXPostView content={content}/> : <MDPostView content={content}/>
      }
      </div>

    </article>
  )
}
