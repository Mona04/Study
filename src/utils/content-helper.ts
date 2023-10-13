import { 
  BlogMDPost, BlogMDXPost, 
  allBlogMDPosts, allBlogMDXPosts 
} from '@/contentlayer/generated'

type BlogPost = {
  isMDX : boolean,
  title : string
}

type PostDirectories = {
  [category: string] : PostDirectory;
}

type PostSlugs = {
  [category: string] : { bPost : boolean};
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

  const callback = (post:any) => {
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
  };
 
  allBlogMDPosts.map(callback);
  allBlogMDXPosts.map(callback);

  var ed = performance.now();
  console.log(`post category takes ${(ed-st)/1000}`);

  return categories;
};



/**
 * "/blog/react/myreact.md" 같은 형식으로 모든 directory 를 저장. 그리고 post 인지 체크.
 * react 의 generateStaticParams() 에 유용함.
 */
const _postSlugs = (() => {
  const slugs: PostSlugs = {};
  
  const callback = (post:any) => {
    if(post._raw == undefined) return;
    
    const slugs = post._raw.flattenedPath.split('/');
    let category: string = "";

    for(let i = 0; i < slugs.length; i++)
    {
      const slug = slugs[i];
      category += `/${slug}`
      if(slugs[category] === undefined) {
        slugs[category] = {
          bPost : i == slugs.length-1
        };
      }
    }    
  };
  
  allBlogMDPosts.map(callback);  
  allBlogMDXPosts.map(callback);  

  return slugs;
})();



export const postDirectories = _postDirectories();

export const postSlugs = _postSlugs;




export const getPostsByCategories = (categories: string[]) => {
  const res : BlogPost[] = [];
  const key = categories.join('/')
  var re = new RegExp(`^${key}`, 'i');

  allBlogMDPosts
    .filter(post => post._raw.flattenedPath.match(re))
    .map(_mdPostToBlogPost)
    .map(post=>res.push(post));

  allBlogMDXPosts
    .filter(post => post._raw.flattenedPath.match(re))
    .map(_mdxPostToBlogPost)
    .map(post=>res.push(post));    

  return res;
}

export const getPostByCategories = (categories: string[]) => {
  const key = categories.join('/')

  let res = allBlogMDPosts
    .find(post => post._raw.flattenedPath === key)  
    .map(_mdPostToBlogPost);
  if(res != undefined) return res;
  
  res = allBlogMDXPosts
    .find(post => post._raw.flattenedPath === key);
    .map(_mdxPostToBlogPost)
  if(res != undefined) return res;

  return res;
}

const _mdPostToBlogPost = (post:BlogMDPost):BlogPost => (
  {
    isMDX : false,
    title: post.title 
  }
)

const _mdxPostToBlogPost = (post:BlogMDXPost):BlogPost => (
  {
    isMDX : true,
    title: post.title 
  }
)