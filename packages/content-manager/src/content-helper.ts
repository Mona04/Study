import { 
  BlogMDPost, BlogMDXPost, 
  allBlogMDPosts, allBlogMDXPosts 
} from '../../.archivelayer/generated/index.js'

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
  isMDX    : boolean,
  useSearch: boolean,

  slug     : string,       // start from base path. root/aaa/bbb... => /aaa/bbb...
  content  : string,     // html or code
  raw      : string,

  date     : Date,
  title    : string,
  description?: string,
  thumbnail?: string,
  tags?: string[],
}

export type PostDirectory = {
  category      : string,
  count         : number,
  searchedCount : number,
  childs        : PostDirectories,
  post?         : BlogPost,
}

const _mdPostToBlogPost = (post:BlogMDPost):BlogPost => (
  {
    isMDX : false,
    useSearch : post.useSearch == true,

    slug: '/' + post._raw.flattenedPath,
    content: post.body.html,
    raw: post._raw.source,

    // 캐리지 리턴 같은 게 남아 있을 수도 있어서 trim 을 해야함.
    date: post.date != undefined ? new Date(post.date) : new Date(),
    title: post.title.trim(),
    description: post.description?.trim(),
    thumbnail: post.thumbnail?.trim(),
    tags: post.tags,
  }
)

const _mdxPostToBlogPost = (post:BlogMDXPost):BlogPost => (
  {
    isMDX: true,
    useSearch: post.useSearch == true,
    
    slug: '/' + post._raw.flattenedPath,
    content: post.body.code,
    raw: post._raw.source,
    
    // 캐리지 리턴 같은 게 남아 있을 수도 있어서 trim 을 해야함.   
    date: post.date != undefined ? new Date(post.date) : new Date(),
    title: post.title.trim(),
    description: post.description?.trim(),
    thumbnail: post.thumbnail?.trim(),
    tags: post.tags,
  }
)
  
/**
 * Tree 구조로 현재 포스트 글을 표현
*/
const _postDirectoryRoot = (() => {
   
  const st = performance.now();  
  
  const directory : PostDirectory = { 
    category: "ROOT",
    count: 0,
    searchedCount: 0,
    childs: {}
  };

  const callback = (post:any, converter : (_:any)=>BlogPost) => {
    if(post._raw == undefined) return;

    const categories = post._raw.flattenedPath.split('/');
    let cur_directory = directory;

    for(let i = 0; i < categories.length; i++)
    {
      cur_directory.count++;
      cur_directory.searchedCount += post.useSearch ? 1 : 0;
      
      const slug = categories[i];
      const sub_directories = cur_directory.childs;
      if(sub_directories[slug] === undefined) 
      {
        sub_directories[slug] = {
          category: slug,
          count: 0,
          searchedCount: 0,
          childs: {}
        };
      }
      cur_directory = sub_directories[slug]!;
    }

    cur_directory.post = converter(post);
  };
 
  allBlogMDPosts.map(p=>callback(p, _mdPostToBlogPost));
  allBlogMDXPosts.map(p=>callback(p, _mdxPostToBlogPost));

  
  if(process != null && process.env.NODE_ENV == 'development')
  {
    var ed = performance.now();
    console.log(`construct post categories takes ${(ed-st)}ms`);
  }

  return directory;
})();


/**
 * "/blog/react/myreact.md" 같은 형식으로 모든 directory 를 저장. 그리고 post 인지 체크.
 * react 의 generateStaticParams() 에 유용함.
 */
const _postSlugs = (() => {

  const st = performance.now();  

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

  if(process != null && process.env.NODE_ENV == 'development')
  {
    var ed = performance.now();
    console.log(`Construct slugs takes ${(ed-st)}ms`);
  }  

  return slugs;
})();



export const postDirectoryRoot = _postDirectoryRoot;

export const postSlugs = _postSlugs;


export const getPostsByPath = (path: string) =>
{
  const res : BlogPost[] = [];

  const categories = path.split('/');
  let cur_directory = _postDirectoryRoot;

  for(const slug of categories)
  {
    // '/' 로 양 끝이 시작하는 경우임. 이는 제외함.
    if(slug.length <= 0) continue;
    const dir = cur_directory.childs[slug];
    if(dir == undefined) return res;
    cur_directory = dir;
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

  for(const slug of categories)
  {
    const dir = cur_directory.childs[slug];
    if(dir == undefined) break;
    cur_directory = dir;
  }

  return cur_directory.post;
}
