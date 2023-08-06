import {cache} from 'react'
import { allPosts } from '@/contentlayer/generated'


type BlogDirectories = {
  [category: string] : BlogDirectory;
}

export type BlogDirectory = {
  category: string,
  count: number,
  childs: BlogDirectories
}

// Tree 구조로 현재 블로그 글을 표현
const _blogDirectories = cache(() => {
  console.log("construct categories...")

  const categories : BlogDirectories = {};
  
  allPosts.map(post=>{
    const slugs = post._raw.flattenedPath.split('/');
    let cur_category = categories;
    for(var slug of slugs)
    {
      if(cur_category[slug] === undefined) {
        cur_category[slug] = {
          category: slug,
          count: 0,
          childs: {}
        };
      }
      cur_category[slug].count++;
      cur_category = cur_category[slug].childs;
    }
  });  

  return categories;
});

export const blogDirectories = _blogDirectories();

type BlogSlugs = {
  [category: string] : { bPost : boolean};
}

const _platBlogSlugs = (() => {
  const categories: BlogSlugs = {};
  
  allPosts.map(post=>{
    const slugs = post._raw.flattenedPath.split('/');
    let category: string = "";
    for(let i = 0; i < slugs.length; i++)
    {
      const slug = slugs[i];
      category += `/${slug}`
      if(categories[category] === undefined) {
        categories[category] = {
          bPost : i == slugs.length-1
        };
      }
    }
  });  

  return categories;
})();

export const blogSlugs = Object.keys(_platBlogSlugs).map(slug=>slug.split('/').slice(2));
export const blogSlugDict = _platBlogSlugs;