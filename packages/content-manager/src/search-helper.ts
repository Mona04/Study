import { getPostsByPath } from "./content-helper.js"
import elasticlunr from 'elasticlunr'

///https://www.ericturner.dev/blog/add-search-to-nextjs-blog
//https://learn.cloudcannon.com/jekyll/jekyll-search-using-lunr-js/
//https://www.reddit.com/r/nextjs/comments/t3n0sv/lunrjs_in_next_js_app/
export interface LUNR_INDEX{
  title: string,
  description? : string,
  tags? : string[],
  body : string,
  slug : string,
}

export async function createSearchIndex() {
  
  console.log("Construct Search Database...");
  const st = performance.now();  

  const index = elasticlunr<LUNR_INDEX>()
  
  //index.use(elasticlunr.lan)
  index.addField('title');
  index.addField('description');
  index.addField('tags');
  index.addField('body');
  index.setRef('slug');
  index.saveDocument(false);

  const posts = getPostsByPath('/').filter(p => p.isDirectory == false);
  posts.forEach(post => {
    index.addDoc({
      title: post.title,
      description: post.description,
      tags: post.tags,
      body: post.raw,
      slug: post.slug,
    })
  });

  
  var ed = performance.now();
  console.log(`Constructing Search DataBase takes ${(ed-st)/1000}`);

  return index.toJSON();
}


