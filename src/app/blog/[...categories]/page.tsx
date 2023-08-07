import PostView from './post-view'
import CategoryView from './category-view'
import { blogSlugs, checkSlug, getPost} from './../blog-helper'

type Params = {
  params: { categories: string[] } 
}

/**
 * @returns  [ {categories: []:string }] 형태어야 함
 */
export const generateStaticParams = () => blogSlugs;

export const generateMetadata = ({ params }: Params) => {
  const post = getPost(params.categories);
  if (!post) {
    return {}
    
  }
  return { title: post.title }
}

export default function Page({ params }: Params) {
 
  const checked = checkSlug(params.categories);
  if(checked == null) {
    throw new Error(`Post not found for slug: ${params.categories}`)
  }

  if(checked.bPost == false)
  {
    return (
      <CategoryView categories={params.categories}/>
    )
  }
  else{
    const post = getPost(params.categories);
    if (post == undefined){
      throw new Error(`Post not found for slug: ${params.categories}`)
    } 
  
    return (
      <div>
        <PostView title={post.title} postHtml={post.body.html} raw={post.body.raw}/>
      </div>
    ) 
  }    
}

export const dynamicParams = false // true | false,
//export const revalidate = 1 // revalidate this page every 60 seconds
//export const dynamic = 'error'