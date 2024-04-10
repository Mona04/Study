'use client'

import * as React from 'react'
import {Context, SearchManager, SearchInput} from "@/context/context"

import SearchResult from './search-result'
import style from "./search-popup.module.scss"

interface IProps{}
interface IState{
    keyword: string,
    results: string[] | null
}

class BlogSearch extends React.Component<IProps, IState>
{
  mDisposables : (IDisposable|undefined)[] = [];
  mSearchManager: SearchManager | undefined | null;

  constructor(props:IProps)
  {
    super(props);

    this.state = {
        keyword: "",
        results: null,
    }

    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onSearchInput = this.onSearchInput.bind(this);
    this.onSearchOutput = this.onSearchOutput.bind(this);

    this.onClickSearch = this.onClickSearch.bind(this);
    this.onClickClear = this.onClickClear.bind(this);
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(): void {
    const context : any = this.context;
    this.mSearchManager = context.searchmgr;
    this.mDisposables.push(this.mSearchManager?.registSearchInputEvent(this.onSearchInput));
    this.mDisposables.push(this.mSearchManager?.registSearchOutputEvent(this.onSearchOutput));
    // mount 전에 누가 검색을 외부에서 하면 반영이 안되므로.
    this.mSearchManager?.re_search();
  }

  componentWillUnmount(): void {
    this.mDisposables.map(v=>v?.dispose());
  }

  onSearchInput(input:SearchInput){
    this.setState({keyword: input ?? ""});
  }

  onSearchOutput(refs:string[]){
    this.setState({results: refs});
  }

  onInputChanged(e: React.ChangeEvent<HTMLInputElement>) : void 
  {   
    this.setState({keyword: e.target.value});
  };

  onClickClear()
  {
    console.log("asdf")
    this.setState({keyword: ""});
  }

  onClickSearch(e: React.MouseEvent<HTMLInputElement>) 
  {
    this.mSearchManager?.search(this.state.keyword);
  };

  onSubmit(e: React.FormEvent<HTMLFormElement>)
  {
    e.preventDefault();
    this.mSearchManager?.search(this.state.keyword);
  }

  render()
  {
    return (
      <div className={`${style['search-popup']}`}>
        <form className="tw-flex tw-border-2 tw-rounded-3xl tw-p-1 tw-pl-4 tw-pr-4 tw-m-2"
              onSubmit={this.onSubmit}>
          <input className='tw-grow tw-bg-transparent' 
                 id='search-input' name='search-input' type='textbox'           
                 onChange={this.onInputChanged} value={this.state.keyword}/>
          <label htmlFor="search-input"/>
          <button id='search-input-clear-btn' 
                 name='clear-btn' type='button'
                 onClick={this.onClickClear}>
            <i className="material-symbols-outlined tw-text-xl tw-align-middle tw-self-center">close</i>    
          </button>
          <div className='tw-border-l-2 tw-border-color-border tw-ml-2 tw-mr-2'/>
          <input id='search-btn' 
                 name='search-btn' type='button'
                 onClick={this.onClickSearch}/>       
          <label className='tw_flex tw-cursor-pointer '  htmlFor="search-btn">
            <i className="material-symbols-outlined tw-text-xl tw-align-middle tw-self-center">search</i>        
          </label>  
        </form>

        <div className={`${style.results}`}>
          <SearchResult items={this.state.results}/>
        </div>
      </div>
    );
  }
}

BlogSearch.contextType = Context;

export default BlogSearch;