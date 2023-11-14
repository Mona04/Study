import Link from "nextwrap/link"
import Image from "nextwrap/image"
import ExportedImage from 'next-image-export-optimizer'
import { getPostsByPath } from 'utils/content-helper'

interface Props {
  title: string,
  slug: string,
  description?: string,
  thumbnail?: string,
}

function CategoryView({slug, title, description, thumbnail}:Props){

  return (
    <div className="tw-m-4">
      <Link href={encodeURI(slug)}>
        <div className="tw-max-h-40">
          <h4 className="tw-mb-1">
            {title}
          </h4>
          <p className="tw-text-color-text-light">
            {description}
          </p>
          <p>
            { thumbnail !== undefined && <Image src={thumbnail} alt="Thumbnail" width={100} height={100} /> }
          </p>
        </div>
      </Link>
    </div>
  )
}

export default function CategoriesView({path}: {path:string}) {
  return (
    <section className="content tw-grid tw-grid-cols-2">
      { 
        getPostsByPath(path).map(post=>{ 
          return <CategoryView key={post.slug} 
                      title={post.title} description={post.description} 
                      thumbnail={post.thumbnail}
                      slug={post.slug}/>
        })
      }
    </section>
  )
}