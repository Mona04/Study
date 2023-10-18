import { getPostsByPath } from 'utils/content-helper'

export default function PostView() {

  return (
    <main>
      { getPostsByPath("").map(post=>{ 
          return <p>{post.title}</p>
        })}
    </main>
  )
}