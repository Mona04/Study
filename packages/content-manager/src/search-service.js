// lunr-language 에 typescript 가 없어서 js 로 해야함.
import lunr from "lunr";
import lunr_stemmer from 'lunr-languages/lunr.stemmer.support'
import lunr_multi from 'lunr-languages/lunr.multi'
import lunr_ko from './lunr.ko.js'

lunr_stemmer(lunr);
lunr_multi(lunr);
lunr_ko(lunr);

export class SearchService
{
  //mSearchIndex : lunr.Index;
  constructor(indexData)
  {
    this.mSearchIndex = lunr.Index.load(indexData);
  }
  searchPosts(args)
  {
    var res = this.mSearchIndex.search(args);   
    return res;
  }
}