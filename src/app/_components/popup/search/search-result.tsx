import PostItem from "@/components/post/post-item" 
import SlugCache from "@/public/slug-index.json"

function SearchItem({slug}:{slug:string})
{
  // 여기 사실상 클라이언트라서 content 도 들어있는 getPostsByPath 같은거 사용하면 전체 글이 청크로 들어감. 
  // 그래서 SlugCache 를 사용하는 것임.
  const caches : {[key:string]:any} = SlugCache;
  const cache = caches[slug];
  if(cache == undefined) return <></>
  return <PostItem slug={slug} title={cache.title} description={cache.description} thumbnail={cache.thumbnail}/>
}

function SearchContent({items}:{items:string[]|null}){
  if(items == null || items.length < 1) 
  {
    return <p className="tw-text-color-text-light tw-ml-auto tw-mr-auto">No Results!</p>
  }
  return items.map((r,i)=><SearchItem key={i} slug={r}/>);
}

function SearchContainer({children,}: {children: React.ReactNode}){
  return (
    <div className="tw-grid tw-grid-cols-1 desk:tw-grid-cols-2 medium:tw-grid-cols-3">
      {children}
    </div>
  )
}

function EmptySearch(){
  return (
    <div className="tw-grid">
      <p className="tw-text-color-text-light tw-ml-auto tw-mr-auto">No Results!</p>
    </div>
  )
}

export default function SearchResults({items}:{items?:string[]|null})
{
  if(items == null || items.length < 1)
  {
    return <EmptySearch/>;
  }
  return (
    <section className='tw-m-3'>
      <SearchContainer>
        <SearchContent items={items}/>
      </SearchContainer> 
    </section>
  );
}  