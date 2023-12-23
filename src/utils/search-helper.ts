import { getPostsByPath } from "./content-helper"
import elasticlunr from 'elasticlunr'

///https://www.ericturner.dev/blog/add-search-to-nextjs-blog
//https://learn.cloudcannon.com/jekyll/jekyll-search-using-lunr-js/
//https://www.reddit.com/r/nextjs/comments/t3n0sv/lunrjs_in_next_js_app/
interface LUNR_INDEX{
  title: string,
  description? : string,
  body : string,
  slug : string,
}

export async function createSearchIndex() {
  
  console.log("Construct Search Database...");
  const st = performance.now();  

  const index = elasticlunr<LUNR_INDEX>()
  index.addField('title');
  index.addField('description');
  index.addField('body');
  //index.addField('thumbnailDescription');
  //index.addField('categories');
  //index.addField('author');
  index.setRef('slug');

  const posts = getPostsByPath('/').filter(p => p.isDirectory == false);
  posts.forEach(post => {
    index.addDoc({
      title: post.title,
      description: post.description,
      body: post.raw,
      slug: post.slug,
    })
  });

  
  var ed = performance.now();
  console.log(`Constructing Search DataBase takes ${(ed-st)/1000}`);

  return index.toJSON();
}



let searchIndex : elasticlunr.Index<LUNR_INDEX>;

//function enhanceSearchResult(result, searchIndex) {
//    const {title, thumbnail} = searchIndex.documentStore.getDoc(result.ref);
//    return {title, thumbnail, ...result};
//}

export async function handler(req:any, res:any) {
  const env = process.env.NODE_ENV;
  const {q, max=5} = req.query;

  // Make sure we're creating/loading the search index every time during development, so it reflects any changes
  // made to the blog posts.
  if (!searchIndex || env === "development") {
    const idx = await createSearchIndex();
    searchIndex = elasticlunr.Index.load(idx);
  }

  let searchResults = searchIndex.search(q, {});
  let excluded = 0;

  if (max > 0) {
    const n = searchResults.length - max;
    excluded = n > 0 ? n : 0;
    searchResults = searchResults.slice(0, max);
  }

  //searchResults = searchResults.map(result => enhanceSearchResult(result, searchIndex))
//
  //res.status(200).json({
  //  results: searchResults,
  //  excluded,
  //});
}

export async function test()
{
  if (process.env.NODE_ENV !== "development") {
    const idx = await createSearchIndex();
    searchIndex = elasticlunr.Index.load(idx);
  }
  else{
  }
}


