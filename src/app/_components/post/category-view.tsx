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

export function ToolTip({input}:{input:string|undefined})
{
  return (
    <span className="tooltip-popup">
      {input}
    </span>
  )
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
    <div className="mobile:tw-h-24 desk:tw-h-72 tw-border-2 tw-m-1 tw-rounded-2xl tw-border-color-border">
      <Link href={encodeURI(slug)}>
        <div className="tw-grid mobile:tw-grid-cols-3 tw-m-2 tw-overflow-clip">
          <div className="mobile:tw-col-span-1 mobile:tw-h-20 desk:tw-h-32 w-m-1 tw-border-2 tw-border-color-border ">
            <Image className="tw-h-full tw-w-full" 
                   src={thumbnail ?? "/images/empty-300x200.jpg"} alt="Thumbnail" 
                   width={256} height={256} priority={true}/>
          </div>
          <div className="mobile:tw-col-span-2 mobile:tw-h-20 desk:tw-h-32 desk:tw-my-2 tw-mx-2 tw-overflow-hidden">
            {/* h4 위 아래에 기본으로 margin padding 붙는거 제거 + Tooltip */}
            <h4 className="tw-mb-0 tw-mt-0 tw-group tw-whitespace-nowrap tooltip-hover tooltip-popup">
       
              {title}
            </h4>          
            <p className="tw-text-color-text-light tw-text-sm tw-break-words tooltip-hover tooltip-popup">

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
      <div className="tw-mx-3">
        {
           <h2>{label}</h2>
        }
      </div>
    )
  }

  return (
    <div className="tw-m-0">
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
      <div className="tw-m-3">
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