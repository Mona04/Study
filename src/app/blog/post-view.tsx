import { BlogPost } from 'utils/content-helper'
import { getBasePath } from "utils/utils"

import TOCView from '@/components/toc/toc'
import BreadCrumbs from "@/components/breadcrumbs/breadcrumbs"
import { MDPostView, MDXPostView } from './post-component'

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
      <BreadCrumbs className='tw-mb-4' path={post.slug}/>
      <TOCView mdSrc={post.raw}/>

      <div>
        <div className='tw-flex tw-flex-row tw-text-sm'>
          <i className="material-symbols-outlined md-sm tw-self-center
                        tw-w-5">
            schedule
          </i>        
          <div className='tw-color-text-dimmed'>Posted  </div>
          <div className='tw-ml-2'>
            {post.date.toLocaleDateString()}
          </div>
        </div>
      </div>

      <hr/>
      
      <div className='tw-mt-10'>
      {
        post.isMDX ? <MDXPostView content={content}/> : <MDPostView content={content}/>
      }
      </div>

      <hr/>

    </article>
  )
}