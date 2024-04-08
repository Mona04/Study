'use client'

import * as React from 'react'
import { SearchService } from 'content-manager'
import { getBasePath } from 'utils/utils';
import SearchResult from './search-result'
import style from "./search-popup.module.scss"

interface IProps{}
interface IState{
    keyword: string,
    results: string[] | null
}

class BlogSearch extends React.Component<IProps, IState>
{
  mSearchService: SearchService | null;
  constructor(props:IProps)
  {
    super(props);
  
    this.mSearchService = null;
    this.state = {
        keyword: "",
        results: null,
    }
    this.onClick = this.onClick.bind(this);
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.search = this.search.bind(this);
  }

  onInputChanged(e: React.ChangeEvent<HTMLInputElement>) : void 
  {   
    this.setState({keyword: e.target.value});
  };

  onClick(e: React.MouseEvent<HTMLInputElement>) 
  {   
    this.search();
  };

  onSubmit(e: React.FormEvent<HTMLFormElement>)
  {
    e.preventDefault();
    this.search();
  }

  onKeyUp(e: React.KeyboardEvent<HTMLInputElement>)
  {
    if(e.code == 'Enter')
    {
    }
  }

  async search()
  {
    if(this.mSearchService == null){
      const res = await fetch(getBasePath() + '/search-index.json')
      const json = await res.json();
      this.mSearchService = new SearchService(json);
    }
    
    const res = this.mSearchService.searchPosts(this.state.keyword);
    this.setState({results: res.map(f=>f.ref)});
  }

  render()
  {
    return (
      <div className={`${style['search-popup']}`}>
        <form className="tw-p-2 tw-flex tw-flex-row tw-border-2 tw-rounded-3xl"
              onSubmit={this.onSubmit}>
          <input className='tw-cursor-pointer tw-bg-color-page-background tw-pl-4' 
                 id='search-input' name='search-input' type='textbox'           
                 onChange={this.onInputChanged}/>
          <label htmlFor="search-input"/>       
          <input id='search-btn' 
                 name='search-btn' type='button'/>         
          <label className='tw_flex tw-cursor-pointer tw-ml-m-100px'  htmlFor="search-btn">
            <i className="material-symbols-outlined md-sm tw-self-center
                      tw-w-5">search</i>        
          </label>  
        </form>

        <div className='tw_flex tw-bg-blue-600'>
          <SearchResult items={this.state.results}/>
        </div>
      </div>
    );
  }
}

export default BlogSearch;