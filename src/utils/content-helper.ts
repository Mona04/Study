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
  [category: string] : {
     bPost : boolean
  };
}

export type BlogPost = {
  isMDX : boolean,
  isDirectory: boolean,

  slug  : string,       // start from base path. root/aaa/bbb... => /aaa/bbb...
  content : string,     // html or code
  raw: string,

  date: Date,
  title : string,
  description?: string,
  thumbnail?: string
}

export type PostDirectory = {
  category : string,
  count    : number,
  childs   : PostDirectories,
  post?    : BlogPost,
}


const _mdPostToBlogPost = (post:BlogMDPost):BlogPost => (
  {
    isMDX : false,
    isDirectory : post.isDirectory == true,

    slug: '/' + post._raw.flattenedPath,
    content: post.body.html,
    raw: post.body.raw,

    // 캐리지 리턴 같은 게 남아 있을 수도 있어서 trim 을 해야함.
    date: post.date != undefined ? new Date(post.date.trim()) : new Date(),
    title: post.title.trim(),
    description: post.description?.trim(),
    thumbnail: post.thumbnail?.trim(),
  }
)

const _mdxPostToBlogPost = (post:BlogMDXPost):BlogPost => (
  {
    isMDX: true,
    isDirectory: post.isDirectory == true,

    slug: '/' + post._raw.flattenedPath,
    content: post.body.code,
    raw: post.body.raw,
 
    // 캐리지 리턴 같은 게 남아 있을 수도 있어서 trim 을 해야함.   
    date: post.date != undefined ? new Date(post.date.trim()) : new Date(),
    title: post.title.trim(),
    description: post.description?.trim(),
    thumbnail: post.thumbnail?.trim(),
  }
)

/**
 * Tree 구조로 현재 포스트 글을 표현
 */
const _postDirectoryRoot = (() => {

  const st = performance.now();  
  console.log("construct categories...")
  
  const directory : PostDirectory = { 
    category: "ROOT",
    count: 0,
    childs: {}
  };

  const callback = (post:any, isMDX : boolean) => {
    if(post._raw == undefined) return;

    const categories = post._raw.flattenedPath.split('/');
    let cur_directory = directory;

    for(let i = 0; i < categories.length; i++)
    {
      cur_directory.count++;
      const slug = categories[i];
      const sub_directories = cur_directory.childs;
      if(sub_directories[slug] === undefined) {
        sub_directories[slug] = {
          category: slug,
          count: 0,
          childs: {}
        };
      }
      cur_directory = sub_directories[slug];
    }

    cur_directory.post =  isMDX ? _mdxPostToBlogPost(post) : _mdPostToBlogPost(post);
  };
 
  allBlogMDPosts.map(p=>callback(p, false));
  allBlogMDXPosts.map(p=>callback(p, true));

  var ed = performance.now();
  console.log(`post category takes ${(ed-st)/1000}`);

  return directory;
})();



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

    const categories = post._raw.flattenedPath.split('/');
    let cur_category: string = "";

    for(let i = 0; i < categories.length; i++)
    {
      const category = categories[i];
      cur_category += `/${category}`
      if(slugs[cur_category] === undefined) {
        slugs[cur_category] = {
          bPost : i == categories.length-1
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



export const postDirectoryRoot = _postDirectoryRoot;

export const postSlugs = _postSlugs;




export const getPostsByPath = (path: string) => {
  
  // flattenedPath don't starts with '/'
  if(path.startsWith('/')) path = path.slice(1);

  const res : BlogPost[] = [];

  const categories = path.split('/');
  let cur_directory = _postDirectoryRoot;

  for(let i = 0; i < categories.length; i++)
  {
    const slug = categories[i];
    if(cur_directory.childs[slug] === undefined)
      break;
    cur_directory = cur_directory.childs[slug]; 
  }   
  const recursive = (dir:PostDirectory)=>{
    if(dir.post != undefined) {
      res.push(dir.post);
    }
    Object.values(dir.childs).map(d=>{
      recursive(d);
    })
  };
  
  recursive(cur_directory);

  return res;
}

export const getPostByPath = (path: string) => {  
  
  if(path.startsWith('/')) path = path.slice(1);

  const categories = path.split('/');
  let cur_directory = _postDirectoryRoot;

  for(let i = 0; i < categories.length; i++)
  {
    const slug = categories[i];
    if(cur_directory.childs[slug] === undefined) {
      return undefined;
    }
    cur_directory = cur_directory.childs[slug]; 
  }

  return cur_directory.post;
}
