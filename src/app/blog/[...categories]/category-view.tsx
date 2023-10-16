import { getPostsByPath } from 'utils/content-helper'

export default function PostView({path}: {path:string}) {
  return (
    <main>
      { 
        getPostsByPath(path).map(post=>{ 
          return <p>{post.title}</p>
        })
      }
    </main>
  )
}