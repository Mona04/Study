import { allPosts } from '@/contentlayer/generated'

type BlogPost = {
  [category: string] : PostDirectory;
}

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
  const st = performance.now();
  
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

  var ed = performance.now();
  console.log(`post category takes ${(ed-st)/1000}`);

  return categories;
};

export const postDirectories = _postDirectories();



type PostSlugs = {
  [category: string] : { bPost : boolean};
}

/**
 * "/blog/react/myreact.md" 같은 형식으로 모든 directory 를 저장. 그리고 post 인지 체크.
 * react 의 generateStaticParams() 에 유용함.
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