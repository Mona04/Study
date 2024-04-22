import { BlogPost, MDPostView, MDXPostView } from 'content-manager'

import { getBasePath } from "utils/utils"
import TOCView      from '@/components/toc/toc'
import BreadCrumbs  from "@/components/post/breadcrumbs"
import UpdateTime   from "@/components/post/updatetime"
import Tags         from "@/components/post/tags"
import PrevNext     from '@/components/post/prev-next'
import RelatedPosts from '@/components/post/related-posts'
import Comments     from '@/components/post/comments'


export default function PostView({post, useComments}: {post:BlogPost, useComments?:boolean}) 
{
  const content = post.content;
  
  return (
    <article className='content2'>
      
      <h1 className="mobile:tw-text-2xl tw-text-3xl tw-leading-normal tw-font-bold tw-mt-0" itemProp='headline'>{post.title}</h1>
      <BreadCrumbs className='tw-mb-4' path={post.slug} isDirectory={false}/>
      <UpdateTime className='tw-mt-0.5' date={post.date}/>
      <TOCView mdSrc={post.raw}/>

      <hr/>
      
      <div className='tw-my-10'>
      {
        post.isMDX ? <MDXPostView content={content}/> : <MDPostView content={content}/>
      }
      </div>
      
      <Tags tags={post.tags}/>
      <hr className='tw-my-4'/>
      <PrevNext slug={post.slug}/>
      <hr className='tw-my-4'/>
      {
        useComments && <><Comments/> <hr className='tw-my-4'/></>
      }
      <RelatedPosts slug={post.slug}/>
    </article>
  )
}