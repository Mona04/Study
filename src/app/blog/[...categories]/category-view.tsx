import { getPosts } from './../blog-helper'

export default function PostView({categories}: {categories:string[]}) {
  
  return (
    <main>
      { getPosts(categories).map(post=>{ 
          return <p>{post.title}</p>
        })}
    </main>
  )
}