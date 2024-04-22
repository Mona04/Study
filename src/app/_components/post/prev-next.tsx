import Link from "nextwrap/link"
import { BlogPost, getPostsByPath } from "content-manager";

function ItemContent({title, isNext}:{title?:string, isNext: boolean})
{
  return (
    <div className="tw-m-2 tw-overflow-hidden  tw-text-center">
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

export default function PrevNex({slug}:{slug:string})
{
  let prev : BlogPost | undefined = undefined;
  let next : BlogPost | undefined = undefined;
  const posts = getPostsByPath(slug.substring(0, slug.lastIndexOf('/')))
                .filter(v=>v.useSearch)
                .sort((a,b)=>b.date.getTime()-a.date.getTime());

  for(let i = 0; i < posts.length; i++)
  {
    if(posts[i]?.slug === slug)
    {
      if(i - 1 >= 0)
      {
        next = posts[i-1];  
      }            
      if(i + 1 < posts.length)
      {
        prev = posts[i+1];            
      }
      break;
    }  
  }

  return (
    <section className="tw-m-0 tw-p-0">
      <div className="tw-grid tw-grid-cols-2">
        <Item isNext={false} slug={prev?.slug} title={prev?.title}/>
        <Item isNext={true} slug={next?.slug} title={next?.title}/>
      </div>
    </section>
  )
}