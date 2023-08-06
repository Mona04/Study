import { allPosts } from '@/contentlayer/generated'

export default function PostView({categories}: {categories:string}) {
  
  return (
    <main>
      { allPosts.map(post=>{ 
          return <p>{post.title}</p>
        })}
    </main>
  )
}