import {cache} from 'react'
import { allPosts } from '@/contentlayer/generated'

export type Categories = {
  [category: string] : Category;
}

export type Category = {
  category: string,
  count: number,
  childs: Categories
}

export const blogCategories = cache(async () => {
  console.log("construct categories...")

  const categories : Categories = {};
  
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
})