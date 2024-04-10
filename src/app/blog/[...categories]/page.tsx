import type { Metadata } from 'next'
import { postSlugs, getPostByPath } from 'content-manager'
import PostView from '@/components/post/post-view'
import CategoryView from '@/components/post/category-view'

type Params = {
  params: { categories: string[] } 
}
const BASECIR = '/blog';

/**
 * @returns  [ {categories: []:string }] 형태어야 함
 */
export const generateStaticParams = () => {

  return Object.keys(postSlugs)
    .filter(slug=> slug.startsWith(`${BASECIR}/`))
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
  const path = decodeURI([BASECIR, ...params.categories].join('/'))
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
  
  let path =  decodeURI([BASECIR, ...params.categories].join('/'));

  const slug = postSlugs[path];

  if(slug == undefined)
  {
    throw new Error(`Post not found for slug: ${params.categories}`)
  }


  if(slug.bPost == false)
  {
    return (
      <CategoryView path={path}/>
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