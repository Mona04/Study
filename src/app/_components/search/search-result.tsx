import Link from "nextwrap/link"
import Image from "nextwrap/image"
import BreadCrumbs from "@/components/post/breadcrumbs"
import { getPostByPath, getPostsByPath } from 'content-manager'

interface Props {
  title: string,
  slug: string,
  description?: string,
  thumbnail?: string,
}

function CategoryView({slug, title, description, thumbnail}:Props)
{
  return (
    <div className="tw-m-4">
      <Link href={encodeURI(slug)}>
        <div>
          { thumbnail !== undefined && <Image src={thumbnail} alt="Thumbnail" width={1200} height={1200} priority={true}/> }
          <h4 className="tw-mb-1 tw-mt-1">
            {title}
          </h4>
          <p className="tw-max-h-24 tw-overflow-hidden  
                        tw-text-color-text-light tw-text-sm">
            {description}
          </p>
        </div>
      </Link>
    </div>
  )
}

function SearchItem({item}:{item:string}){
  const post = getPostByPath(item);
  if(post == null) return <></>

  return <CategoryView slug={post.slug} title={post.title} description={post.description} thumbnail={post.thumbnail}/>
}

function SearchContent({items}:{items:string[]|null}){
  if(items == null) return <></>
  return items.map((r,i)=><SearchItem key={i} item={r}/>);
}

function SearchContainer({children,}: {children: React.ReactNode}){
  return (
    <div className="tw-grid tw-grid-cols-1 desk:tw-grid-cols-2">
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