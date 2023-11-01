import { 
  BlogMDPost, BlogMDXPost, 
  allBlogMDPosts, allBlogMDXPosts 
} from '@/contentlayer/generated'


type PostDirectories = {
  [category: string] : PostDirectory;
}

/*
 * root/_content/mycategory1/... => /mycategory1/...
 */
type PostSlugs = {
  [category: string] : { bPost : boolean};
}

export type BlogPost = {
  isMDX : boolean,
  slug  : string,       // start from base path. root/aaa/bbb... => /aaa/bbb...
  content : string,     // html or code
  raw: string,

  title : string,
  date: string,
  description?: string,
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

  const st = performance.now();  
  console.log("construct slugs...")

  const slugs: PostSlugs = {};
  
  const callback = (post:any) => {
    if(post._raw == undefined) return;
    
    const paths = post._raw.flattenedPath.split('/');
    let category: string = "";

    for(let i = 0; i < paths.length; i++)
    {
      const slug = paths[i];
      category += `/${slug}`
      if(slugs[category] === undefined) {
        slugs[category] = {
          bPost : i == paths.length-1
        };
      }
    }    
  };
  
  allBlogMDPosts.map(callback);  
  allBlogMDXPosts.map(callback);  

  var ed = performance.now();
  console.log(`post slug takes ${(ed-st)/1000}`);

  return slugs;
})();



export const postDirectories = _postDirectories();

export const postSlugs = _postSlugs;




export const getPostsByPath = (path: string) => {
  
  // flattenedPath don't starts with '/'
  if(path.startsWith('/')) path = path.slice(1);

  const res : BlogPost[] = [];
  var re = new RegExp(`^${path}`, 'i');

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

export const getPostByPath = (path: string) => {  
  
  // flattenedPath don't starts with '/'
  if(path.startsWith('/')) path = path.slice(1);
  
  {
    let res = allBlogMDPosts
    .find(post => post._raw.flattenedPath === path)  
    
    if(res != undefined) return _mdPostToBlogPost(res);
  }

  {
    let res = allBlogMDXPosts
    .find(post => post._raw.flattenedPath === path)  
    
    if(res != undefined) return _mdxPostToBlogPost(res);
  }
}

const _mdPostToBlogPost = (post:BlogMDPost):BlogPost => (
  {
    isMDX : false,
    slug: '/'+post._raw.flattenedPath,
    content: post.body.html,
    raw: post.body.raw,
    title: post.title,
    description: post.description,
    date: post.date,
  }
)

const _mdxPostToBlogPost = (post:BlogMDXPost):BlogPost => (
  {
    isMDX : true,
    slug: '/'+post._raw.flattenedPath,
    content: post.body.code,
    raw: post.body.raw,
    title: post.title,
    description: post.description,
    date: post.date,
  }
)