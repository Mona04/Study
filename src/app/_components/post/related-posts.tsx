import { BlogPost, getPostsByPath } from "content-manager";
import PostItem from "./post-item";
import { shuffle } from "utils/utils";

export default function RelatedPost({post}: {post:BlogPost})
{
  const relatedPosts = shuffle(getPostsByPath(post.slug.substring(0, post.slug.lastIndexOf('/'))).filter(p=>p.slug != post.slug), 3);
  return (
    <section className="content2 ">
      <h2>Related Posts</h2>
      <div className="tw-grid tw-grid-cols-1 desk:tw-grid-cols-2 medium:tw-grid-cols-3">
      {
        relatedPosts?.map(
          p => 
          <PostItem key={p.slug} slug={p.slug} title={p.title} 
                    description={p.description} 
                    thumbnail={p.thumbnail}/>
        )
      }
      </div>
      <hr/>
    </section>
  )
}