import { getPostByPath } from 'content-manager';
import { MDPostView, MDXPostView } from 'content-manager/hooks'
import RelatedPosts from '@/components/post/related-posts'


export default function Home() {
  const post = getPostByPath('/home/about');
  if (post == undefined){
    throw new Error(`Post not found /home/page file.`)
  }    
  return (
    <article className='content2'>     
      <h1 className="mobile:tw-text-2xl tw-text-3xl tw-leading-normal tw-font-bold tw-mt-0" itemProp='headline'>{post.title}</h1>
      <div className='tw-my-10'>
      {
        post.isMDX ? <MDXPostView content={post.content}/> : <MDPostView content={post.content}/>
      }
      </div>
      <hr className='tw-my-4'/>
      <RelatedPosts slug={'blog/blogging/'}/>
    </article>
  )
}