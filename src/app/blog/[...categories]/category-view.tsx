import Link from "nextwrap/link"
import { getPostsByPath } from 'utils/content-helper'

interface Props {
  title: string,
  slug: string
}

function CategoryView({title, slug}:Props){
  return (
    <div>
      <Link href={slug}>
        {title}
      </Link>
    </div>
  )
}

export default function CategoriesView({path}: {path:string}) {
  return (
    <main>
      { 
        getPostsByPath(path).map(post=>{ 
          return <CategoryView key={post.slug} title={post.slug} slug={post.slug}/>
        })
      }
    </main>
  )
}