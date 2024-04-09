import { BlogPost } from 'content-manager'
import { getBasePath } from "utils/utils"

import TOCView from '@/components/toc/toc'
import BreadCrumbs from "@/components/post/breadcrumbs"
import UpdateTime from "@/components/post/updatetime"
import Tags from "@/components/post/tags"
import { MDPostView, MDXPostView } from 'content-manager';

/**
 * contentlayer 는 캐시를 쓰므로 컴파일 단계에서 링크를 바꿔놔야함.
 * @param content 
 * @returns 
 */
function postProcessContent(content: string) {
  return content.replaceAll("PUBLIC_BASE_PATH", getBasePath());
}

export default function PostView({post}: {post:BlogPost}) 
{
  const content = postProcessContent(post.content)
  
  return (
    <article>
      
      <h1 className="tw-text-4xl tw-font-bold tw-mt-1" itemProp='headline'>{post.title}</h1>
      <BreadCrumbs className='tw-mb-4' path={post.slug} isDirectory={false}/>
      <UpdateTime className='tw-mt-0.5' date={post.date}/>
      <TOCView mdSrc={post.raw}/>

      <hr/>
      
      <div className='tw-mt-10'>
      {
        post.isMDX ? <MDXPostView content={content}/> : <MDPostView content={content}/>
      }
      </div>

      <hr/>

      <Tags tags={post.tags}/>

    </article>
  )
}