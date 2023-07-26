
import * as Blog from 'lib/mdpost/blog-api'
import { allPosts } from '@/contentlayer/generated'


export const generateStaticParams = async () => allPosts.map((post) => ({ categories: post._raw.flattenedPath.split('/').slice(1) }))

export const generateMetadata = ({ params }: { params: { categories: string[] } }) => {
  const cur = ['blog', ...params.categories.slice(-1)].join('/')
  const post = allPosts.find((post) => post._raw.flattenedPath === cur)
  if (!post) throw new Error(`Post not found for slug: ${params.categories}`)
  return { title: post.title }
}

export default async function Page({ params }: { params: { categories: string[], name: string} }) {
  const cur = ['blog', ...params.categories.slice(-1)].join('/')
  const post = allPosts.find((post) => post._raw.flattenedPath === cur)
  if (!post) throw new Error(`Post not found for slug: ${params.categories}`)

  return <div>
    <h1 className="text-3xl font-bold">{post.title}</h1>
    <div>My Slugs: {params.categories}</div>
    <div>My Slugs: {params.name}</div>
    <div>My Slugs: {Date.now()}</div>

  </div>
}

export const dynamicParams = false // true | false,
//export const revalidate = 1 // revalidate this page every 60 seconds
//export const dynamic = 'error'