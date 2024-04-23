import { getPostByPath } from 'content-manager'
import PostItem from "@/components/post/post-item" 

function SearchItem({item}:{item:string}){
  const post = getPostByPath(item);
  if(post == undefined) return <></>
  return <PostItem slug={post.slug} title={post.title} description={post.description} thumbnail={post.thumbnail}/>
}

function SearchContent({items}:{items:string[]|null}){
  if(items == null || items.length < 1) 
  {
    return <p className="tw-text-color-text-light tw-ml-auto tw-mr-auto">No Results!</p>
  }
  return items.map((r,i)=><SearchItem key={i} item={r}/>);
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