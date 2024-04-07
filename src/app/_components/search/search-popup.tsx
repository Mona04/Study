'use client'

import * as React from 'react'
import { SearchService } from 'content-manager'
import { getBasePath } from 'utils/utils';

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

  onKeyUp(e: React.KeyboardEvent<HTMLInputElement>)
  {
    if(e.code == 'Enter')
    {
      this.search();
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
      <div className='tw-left-1/2 -tw-translate-x-1/2 tw-fixed tw-top-nav-height  tw-bg-red-400 '>
        <input className='tw_flex tw-bg-red-300' id='earch-input' name='search-input' type='textbox'           
               onChange={this.onInputChanged}               
               onKeyUp={this.onKeyUp}/>
        <input id='search-btn' name='search-btn' type='button'           
               onClick={this.onClick}/>               
        <label className='tw_flex tw-cursor-pointer tw-bg-cyan-600'  htmlFor="search-btn">Search</label>  
        <p className='tw_flex tw-bg-blue-600'>{this.state.results}</p>
      </div>
    );
  }
}

export default BlogSearch;