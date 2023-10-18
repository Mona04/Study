import PostView from './post-view'
import CategoryView from './category-view'
import { postSlugs, getPostByPath } from 'utils/content-helper'

type Params = {
  params: { categories: string[] } 
}

/**
 * @returns  [ {categories: []:string }] 형태어야 함
 */
export const generateStaticParams = () => {
  return Object.keys(postSlugs)
    .filter(slug=> slug.startsWith('/blog'))
    .map(slug=> ({ categories: slug.split('/').slice(2)}))
}

export const generateMetadata = ({ params }: Params) => {
  const path = ['/blog', ...params.categories].join('/')
  const post = getPostByPath(path);

  if (!post) {
    return {}    
  }
  return { 
    title: post.title 
  }
}

export default function Page({ params }: Params) {
  const path = ['/blog', ...params.categories].join('/');
  if(!(path in postSlugs))
  {
    throw new Error(`Post not found for slug: ${params.categories}`)
  }

  const slug = postSlugs[path];
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

export const dynamicParams = false // true | false,
//export const revalidate = 1 // revalidate this page every 60 seconds
//export const dynamic = 'error'