import { getPosts } from './blog-helper'

export default function PostView() {
  
  return (
    <main>
      { getPosts(['']).map(post=>{ 
          return <p>{post.title}</p>
        })}
    </main>
  )
}