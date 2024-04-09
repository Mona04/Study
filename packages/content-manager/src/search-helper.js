// lunr-language 에 typescript 가 없어서 js 로 해야함.
import lunr from "lunr";
import lunr_stemmer from 'lunr-languages/lunr.stemmer.support.js'
import lunr_multi from 'lunr-languages/lunr.multi.js'
import lunr_ko from './lunr.ko.js'

lunr_stemmer(lunr);
lunr_multi(lunr);
lunr_ko(lunr);

import { getPostsByPath } from "./content-helper.js"

/*
export interface LUNR_INDEX{
  title: string,
  description? : string,
  tags? : string[],
  body : string,
  slug : string,
}
*/

///https://www.ericturner.dev/blog/add-search-to-nextjs-blog
//https://learn.cloudcannon.com/jekyll/jekyll-search-using-lunr-js/
//https://www.reddit.com/r/nextjs/comments/t3n0sv/lunrjs_in_next_js_app/

export async function createSearchIndex() {
  
  console.log("Construct Search Database...");
  const st = performance.now();  


  const index = lunr(function(){
    
    this.use(lunr.multiLanguage('ko'))
    this.field('title', {boost: 10});
    this.field('description', {boost: 5});
    this.field('tags', {boost: 10});
    this.field('body', {boost: 3});
    this.ref('slug');

    const posts = getPostsByPath('/').filter(p => p.useSearch);
    posts.forEach(post => {
      this.add({
        title: post.title,
        description: post.description,
        tags: post.tags,
        body: post.raw,
        slug: post.slug,
      })
    });
  })

  var ed = performance.now();
  console.log(`Constructing Search DataBase takes ${(ed-st)} ms`);

  return index.toJSON();
}


