import { allPosts } from '@/contentlayer/generated'


type PostDirectories = {
  [category: string] : PostDirectory;
}

export type PostDirectory = {
  category: string,
  count: number,
  childs: PostDirectories
}

/**
 * Tree 구조로 현재 포스트 글을 표현
 */
const _postDirectories = () => {
  console.log("construct categories...")

  const categories : PostDirectories = {};
  
  allPosts.map(post=>{
    if(post._raw == undefined) return;

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
};

export const postDirectories = _postDirectories();



type PostSlugs = {
  [category: string] : { bPost : boolean};
}

/**
 * "/blog/react/myreact.md" 같은 형식으로 모든 카테고리에 대한 dictionary
 */
const _postSlugs = (() => {
  const categories: PostSlugs = {};
  
  allPosts.map(post=>{
    if(post._raw == undefined) return;
    
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

export const postSlugs = _postSlugs;