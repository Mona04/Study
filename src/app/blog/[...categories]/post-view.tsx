import { Post } from '@/contentlayer/generated'

export default function PostView(post: Post) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div dangerouslySetInnerHTML={{__html: post.body.html}}></div>
      <div>My Slugs: {Date.now()}</div>
  </div>
  )
}