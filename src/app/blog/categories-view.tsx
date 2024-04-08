import Link from "nextwrap/link"
import Image from "nextwrap/image"
import BreadCrumbs from "@/components/post/breadcrumbs"
import { getPostByPath, getPostsByPath } from 'content-manager'
import { MDPostView, MDXPostView } from './post-component'

interface Props {
  title: string,
  slug: string,
  description?: string,
  thumbnail?: string,
}

/**
 * post item.
 * @param param0 
 * @returns 
 */
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

/**
 * 카테고리와 같은 위치에 같은 이름을 가진 파일이 있으면 그걸 띄워준다.
 * @param param0 
 * @returns 
 */
function CategoryDetail({path}:{path:string}){
  const post = getPostByPath(path);
 
  if(post == undefined || post.isDirectory == true) {
    const categories = path.split('/');
    const label = categories[categories.length-1]!.toUpperCase();
    return (
      <div className="tw-m-4">
        {
           <h2>{label}</h2>
        }
      </div>
    )
  }

  return (
    <div className="tw-m-4">
      {
        post.isMDX ? <MDXPostView content={post.content}/> : <MDPostView content={post.content}/>
      }
    </div>
  )
}

export default function CategoriesView({path}: {path:string}) {
  return (
    <section className="content">
      {
        <CategoryDetail path={path}/>
      }
      <div className="tw-m-4">
        <BreadCrumbs path={path} isDirectory={true}/>
      </div>      
      <hr className=""/>
      <div className="tw-grid tw-grid-cols-2 desk:tw-grid-cols-4">
        { 
          getPostsByPath(path)
          .filter(post=>!post.isDirectory)
          .map(post=>{ 
            return <CategoryView key={post.slug} 
                        title={post.title} description={post.description} 
                        thumbnail={post.thumbnail}
                        slug={post.slug}/>
          })
        }
      </div>

    </section>
  )
}