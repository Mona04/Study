import type { Metadata } from 'next'
import PostView from '../post-view'
import CategoriesView from '../categories-view'
import { postSlugs, getPostByPath } from 'content-manager'

type Params = {
  params: { categories: string[] } 
}

/**
 * @returns  [ {categories: []:string }] 형태어야 함
 */
export const generateStaticParams = () => {

  return Object.keys(postSlugs)
    .filter(slug=> slug.startsWith('/blog/'))
    .map(slug=> {

      /*
       * build 시에 자동으로 encoding 을 해주는 문제
       * https://github.com/vercel/next.js/issues/11016
      */
      if( process.env.NODE_ENV == 'development')
      {
        return { categories: encodeURI(slug).split('/').slice(2)};
      }
      else{
        return { categories: (slug).split('/').slice(2)};
      }    
    }
  )
}

export const generateMetadata = ({ params }: Params) : Metadata => {
  const path = decodeURI(['/blog', ...params.categories].join('/'))
  const post = getPostByPath(path);

  if (!post) {
    return {}    
  }
  return { 
    title: post.title,
    description: post.description,
    category: path,
  }
}

export default function Page({ params }: Params) {
  
  let path =  decodeURI(['/blog', ...params.categories].join('/'));

  const slug = postSlugs[path];

  if(slug == undefined)
  {
    throw new Error(`Post not found for slug: ${params.categories}`)
  }


  if(slug.bPost == false)
  {
    return (
      <CategoriesView path={path}/>
    )
  }
  else{
    const post = getPostByPath(path);
    if (post == undefined){
      throw new Error(`Post not found for slug: ${params.categories}`)
    }    

    return (
      <>
        <PostView post={post}/>
      </>
    ) 
  }
}

//export const dynamicParams = false // true | false,
//export const revalidate = 1 // revalidate this page every 60 seconds
//export const dynamic = 'error'