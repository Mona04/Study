import Link from "nextwrap/link"
import Image from "nextwrap/image"
import BreadCrumbs from "@/components/post/breadcrumbs"
import { getPostByPath, getPostsByPath } from 'content-manager'
import { MDPostView, MDXPostView } from 'content-manager';

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
export function CategoryView({slug, title, description, thumbnail}:Props)
{
  // 
  return (
    <div className="tw-overflow-clip mobile:tw-h-32 desk:tw-h-72 tw-border-2 tw-m-1 tw-rounded-2xl tw-border-color-border">
      <Link href={encodeURI(slug)}>
        <div className="tw-grid mobile:tw-grid-cols-3 tw-m-2 tw-overflow-clip">
          <div className="mobile:tw-col-span-1 w-m-1 mobile:tw-h-28 desk:tw-h-32 tw-border-2 tw-border-color-border ">
            <Image className="tw-h-full tw-w-full" 
                   src={thumbnail ?? "/images/empty-300x200.jpg"} alt="Thumbnail" 
                   width={256} height={256} priority={true}/>
          </div>
          <div className="mobile:tw-col-span-2 tw-mx-2 desk:tw-my-2 mobile:tw-h-24 desk:tw-h-28 tw-overflow-hidden ">
            <h4 className="tw-mb-0 tw-mt-0 tw-group tw-whitespace-nowrap">             
              <span className="tw-absolute tw-scale-0 group-hover:tw-scale-100 
                             tw-rounded tw-bg-color-text-bg-dimmed tw-text-color-text 
                             tw-m-4 tw-px-2 tw-text-xs">{title}</span>
               {title}
            </h4>          
            <p className="tw-text-color-text-light tw-text-sm tw-break-words tw-group">
              <span className="tw-absolute tw-scale-0 group-hover:tw-scale-100 
                             tw-rounded tw-bg-color-text-bg-dimmed tw-text-color-text 
                             tw-m-4 tw-px-2 tw-text-xs">{description}</span>
              {description}
            </p>
          </div>
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
  const post = getPostByPath(path+'/_index');
 
  if(post == undefined) {
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

export default function CategoriesView({path}: {path:string})
{
  return (
    <section className="content">
      {
        <CategoryDetail path={path}/>
      }
      <div className="tw-m-4">
        <BreadCrumbs path={path} isDirectory={true}/>
      </div>      
      <hr className=""/>
      <div className="tw-grid tw-grid-cols-1 desk:tw-grid-cols-4">
        { 
          getPostsByPath(path)
          .filter(post=>post.useSearch)
          .sort((a,b)=>b.date.getTime()-a.date.getTime()) // 최신순
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