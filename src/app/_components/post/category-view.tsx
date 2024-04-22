import { getPostByPath, getPostsByPath } from 'content-manager'
import { MDPostView, MDXPostView } from 'content-manager/hooks';
import BreadCrumbs from "@/components/post/breadcrumbs"
import PostItem    from "@/components/post/post-item" 

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
    <div className="tw-mx-3">
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
      <div className="tw-grid tw-grid-cols-1 desk:tw-grid-cols-2 medium:tw-grid-cols-3 medium-wide:tw-grid-cols-4">
      { 
        getPostsByPath(path)
        .filter(post=>post.useSearch)
        .sort((a,b)=>b.date.getTime()-a.date.getTime()) // 최신순
        .map(post=>{ 
          return <PostItem key={post.slug} 
                      title={post.title} description={post.description} 
                      thumbnail={post.thumbnail}
                      slug={post.slug}/>
        })
      }
      </div>
    </section>
  )
}