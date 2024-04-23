import Link from "nextwrap/link"
import { BlogPost, getPostsByPath } from "content-manager";

function ItemContent({title, isNext}:{title?:string, isNext: boolean})
{
  return (
    <div className="tw-m-2 tw-overflow-hidden tw-text-center">
      <h5 className={`tw-mb-0 tw-mt-0 ${(title === undefined && "tw-text-color-border")}`}>
        {isNext ? "Next Post" : "Previous Post"}
      </h5>
      <h4 className="tw-mb-0 tw-mt-0 
                     tw-whitespace-nowrap tw-text-ellipsis tw-overflow-hidden">       
        {title}
      </h4>
    </div>
  )
}

function Item({slug, title, isNext}:{slug?:string, title?:string, isNext: boolean})
{
  // <Link/> 가 빈 slug 엔 없어야 함.
  if(slug === undefined){
    return (
      <article className="tw-m-1 tw-rounded-2xl tw-border-color-border tw-border-2 ">
        <ItemContent isNext={isNext} title={title}/>
      </article>      
    )
  }
  return (
    <article className="tw-m-1 tw-rounded-2xl tw-border-2 tw-border-color-border tw-overflow-hidden
                        hover:tw-border-color-primary hover:tw-transition-all hover:tw-duration-500">
      <Link href={encodeURI(slug)}>
        <ItemContent isNext={isNext} title={title}/> 
      </Link>
    </article>
  )  
}

const postsSlugCache : {[dir:string]:{
  [slug:string]:number
}} = {}
const postsCache : {[dir:string]:{
  [index:number]:BlogPost
}} = {}

const register = (slug:string)=>
{
  const dir = slug.substring(0, slug.lastIndexOf('/'));

  if(postsCache[dir] == undefined)
  {
    const posts = getPostsByPath(dir)
                  .filter(v=>v.useSearch)
                  .sort((a,b)=>b.date.getTime()-a.date.getTime());    
    const slugCache : {[slug:string]:number} = {}; 
    const indexCache : {[index:number]:BlogPost} = {}; 

    for(let i = 0; i < posts.length; i++)
    {
      slugCache[posts[i]!.slug] = i;
      indexCache[i] = posts[i]!;
    }    
      
    postsSlugCache[dir] = slugCache; 
    postsCache[dir] = indexCache; 
  }

  const curPostSlugCache = postsSlugCache[dir];
  const curPostCache = postsCache[dir];
  if(curPostSlugCache == undefined || curPostCache == undefined)
  {
    throw new Error(`Prev/Next Cache is not created. slug is :${slug}`)    
  }
  
  const index = curPostSlugCache[slug];
  if(index == undefined) return {prev:undefined, next:undefined};
  return { 
    prev:curPostCache[index-1], 
    next:curPostCache[index+1]
  }
}

export default function PrevNext({slug}:{slug:string})
{
  const cache = register(slug);
  
  return (
    <section className="tw-m-0 tw-p-0">
      <div className="tw-grid tw-grid-cols-2">
        <Item isNext={false} slug={cache.prev?.slug} title={cache.prev?.title}/>
        <Item isNext={true}  slug={cache.next?.slug} title={cache.next?.title}/>
      </div>
    </section>
  )
}