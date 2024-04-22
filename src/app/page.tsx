import { getPostByPath } from 'content-manager';
import PostView from '@/components/post/post-view'

export default function Home() {
  const post = getPostByPath('/home/page');
  if (post == undefined){
    throw new Error(`Post not found /home/page file.`)
  }    
  return (
    <div>     
      <PostView post={post}/>
    </div>
  )
}