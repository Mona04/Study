import {allPosts} from '@/contentlayer/generated'
import {postSlugs} from 'utils/content-helper'

// blog 가 무조건 앞에 온다고 가정한 헬퍼

/**
 * generateStaticParams() 에 사용
 */
export const blogSlugs = Object.keys(postSlugs)
  .map(slug=> ({ categories: slug.split('/').slice(2)}))
  .filter(ca=>ca.categories.length > 0);

/**
 * 주어진 slug 에 blog post 가 맞는지 체크.
 * @param categories 
 * @returns 
 */
export function checkSlug(categories: string[]) {
  const slug = ["", 'blog', ...categories].join('/');
  return slug in postSlugs ? postSlugs[slug] : null;
}

export const getPost = (categories: string[]) => {
  const cur = ['blog', ...categories].join('/')
  return allPosts.find((post) => post._raw.flattenedPath === cur)
}

export const getPosts = (categories: string[]) => {
  const cur = ['blog', ...categories].join('/')
  var re = new RegExp(`^${cur}`, 'i');
  return allPosts
    .filter(post => post._raw.flattenedPath.match(re))
}