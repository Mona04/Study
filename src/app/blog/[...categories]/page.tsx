import { allPosts } from '@/contentlayer/generated'
import PostView from './post-view'
import CategoryView from './category-view'
import {blogSlugs, blogSlugDict} from 'utils/blog-helper'

type Params = {
  params: { categories: string[] } 
}

const getPost = (params: { categories: string[] }  ) => {
  const cur = ['blog', ...params.categories].join('/')
  return allPosts.find((post) => post._raw.flattenedPath === cur)
}

export const generateStaticParams = () => blogSlugs;

export const generateMetadata = ({ params }: Params) => {
  const post = getPost(params);
  if (!post) {
    return {}
    
  }
  return { title: post.title }
}

export default function Page({ params }: Params) {
  const slug = ["", 'blog', ...params.categories].join('/');
  if(slug in blogSlugDict == false) {
    throw new Error(`Post not found for slug: ${params.categories}`)
  }

  if(blogSlugDict[slug].bPost == false)
  {
    return (
      <CategoryView categories={slug}/>
    )
  }
  const post = getPost(params);
  if (!post){
    console.log("asfd")
  } 


  return (
    <div>
      <PostView title={post.title} postHtml={post.body.html} raw={post.body.raw}/>
    </div>
  ) 
    
}

export const dynamicParams = false // true | false,
//export const revalidate = 1 // revalidate this page every 60 seconds
//export const dynamic = 'error'