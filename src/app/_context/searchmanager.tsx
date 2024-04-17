import { Event, EventDisposer } from 'utils/event'
import { getBasePath } from 'utils/utils';
import { SearchService } from 'content-manager'

export type SearchInput = string | undefined | null;

export class SearchManager 
{
  private mSearchInputEvent = new Event<SearchInput>();
  private mSearchOutputEvent = new Event<string[]>();
  private mSearchService : SearchService | null = null;
  private mKeyword : SearchInput = null;

  constructor()
  {
  }

  public searchNative(input:SearchInput, callback:(e:string[])=>void)
  {
    this.getSearchService().then(s=>{
      const res = s.searchPosts(input).map((f:any&{ref:string})=>f.ref);
      callback(res);
    });
  }

  /**
   * 이전 키워드로 다시 찾기. 
   * 서치 팝업이 막 열렸을 때 기존 키워드로 자동찾기 용.
   */
  public re_search(){
    this.search(this.mKeyword);
  }

  public search(input:SearchInput)
  {
    this.mKeyword = input;
    this.mSearchInputEvent.invoke(input);

    if(input == null || input.length < 2) return this.mSearchOutputEvent.invoke([]);
    
    this.getSearchService().then(s=>{
      const res = s.searchPosts(input).map((f:any&{ref:string})=>f.ref);
      this.mSearchOutputEvent.invoke(res);
    });
  }

  public searchByTags(tags:string[])
  {
    this.search(`tags:${[...tags].join(' ')}`);
  }

  public registerSearchInputEvent(func : (input:SearchInput) => void) : EventDisposer<SearchInput>{
    return this.mSearchInputEvent.subscribe(func);
  }

  public registerSearchOutputEvent(func : (output:string[]) => void) : EventDisposer<string[]>{
    return this.mSearchOutputEvent.subscribe(func);
  }

  private async getSearchService(){
    if(this.mSearchService == null){
      const res = await fetch(getBasePath() + '/search-index.json')
      const json = await res.json();
      this.mSearchService = new SearchService(json);
    }
    return this.mSearchService;
  }
}
