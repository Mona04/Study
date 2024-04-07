import elasticlunr from 'elasticlunr'
import { LUNR_INDEX } from "./search-helper.js"

export class SearchService
{
  mSearchIndex : elasticlunr.Index<LUNR_INDEX>;
  constructor(indexData : any)
  {
    this.mSearchIndex = elasticlunr.Index.load(indexData);
  }
  searchPosts(args: string)
  {
    var res = this.mSearchIndex.search(
      args, 
      {
        fields: {
          tags: {boost: 3}, 
          title: {boost: 2},
          slug: {boost: 2,},
          body: {boost: 1},
        }
      });    
    return res;
  }
}