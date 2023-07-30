import { allPosts } from '@/contentlayer/generated'
import * as Blog from 'lib/mdpost/blog-api'
import PostView from './post-view'

// slug 에서 blog 는 제외한 나머지가 필요함
export const generateStaticParams = async () => allPosts.map((post) => ({ categories: post._raw.flattenedPath.split('/').slice(1) }))

export const generateMetadata = ({ params }: { params: { categories: string[] } }) => {
  const cur = ['blog', ...params.categories].join('/')
  const post = allPosts.find((post) => post._raw.flattenedPath === cur)
  if (!post) throw new Error(`Post not found for slug: params : ${cur}`)
  return { title: post.title }
}

export default async function Page({ params }: { params: { categories: string[], name: string} }) {
  const cur = ['blog', ...params.categories].join('/')
  const post = allPosts.find((post) => post._raw.flattenedPath === cur)
  if (!post) throw new Error(`Post not found for slug: ${params.categories}`)

  return <div>
    {PostView(post)}
  </div>
}

export const dynamicParams = false // true | false,
//export const revalidate = 1 // revalidate this page every 60 seconds
//export const dynamic = 'error'