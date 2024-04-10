import { getPostByPath } from 'content-manager'
import { CategoryView } from "../post/category-view"

interface Props {
  title: string,
  slug: string,
  description?: string,
  thumbnail?: string,
}

function SearchItem({item}:{item:string}){
  const post = getPostByPath(item);
  if(post == null) return <></>

  return <CategoryView slug={post.slug} title={post.title} description={post.description} thumbnail={post.thumbnail}/>
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
    <div className="tw-grid tw-grid-cols-1 desk:tw-grid-cols-2 tw-m-3">
      {children}
    </div>
  )
}

export default function SearchResults({items}:{items:string[]|null}) {
  return (
    <section>
      <SearchContainer>
        <SearchContent items={items}/>
      </SearchContainer> 
    </section>
  );
}  