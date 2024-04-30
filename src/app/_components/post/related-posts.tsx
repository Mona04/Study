import { getPostsByPath } from "content-manager";
import { shuffle } from "utils/utils";
import PostItem from "./post-item";

export default function RelatedPost({slug}: {slug:string})
{
  const relatedPosts = shuffle(getPostsByPath(slug.substring(0, slug.lastIndexOf('/'))).filter(p=>p.useSearch && p.slug != slug), 4);
  
  return (
    <section className="">
      <h4 className="tw-mt-0 tw-mb-2">Related Posts</h4>
      <div className="tw-grid tw-grid-cols-1 desk:tw-grid-cols-2 medium:tw-grid-cols-4 medium-wide:tw-grid-cols-4">
      {
        relatedPosts?.map(
          p => 
          <PostItem key={p.slug} slug={p.slug} title={p.title}
                    description={p.description} 
                    thumbnail={p.thumbnail}/>
        )
      }
      </div>
    </section>
  )
}