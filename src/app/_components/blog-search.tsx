'use client'

import * as React from 'react'
import * as Utils from "utils/ssr-helper"
import { allPosts } from '@/contentlayer/generated'

interface IProps{}
interface IState{
    keyword: string,
    searched: string
}

class BlogSearch extends React.Component<IProps, IState>
{
  defaultTheme : StyleSheet | undefined;
  darkTheme : StyleSheet | undefined;
  constructor(props:IProps)
  {
    super(props);
  
    this.state = {
        keyword: "",
        searched: ""
    }
    this.onClick = this.onClick.bind(this);
    this.onInputChanged = this.onInputChanged.bind(this);
  }
  onInputChanged(e: React.ChangeEvent<HTMLInputElement>) : void 
  {   
    this.setState({keyword: e.target.value});
  };

  onClick(e: React.InputHTMLAttributes<HTMLInputElement>) : void 
  {   
    const posts = allPosts
    .filter((post) => post.title.includes(this.state.keyword))
    .reduce((acc, cur)=>{ return acc = acc + cur.title + '\n'; }, ""); 
    console.log(posts)
    this.setState({searched: posts});
  };

  render()
  {
    return (
      <div >
        <input id='earch-input' name='search-input' type='textbox'           
               onChange={this.onInputChanged}/>
        <input id='search-btn' name='search-btn' type='button'           
               onClick={this.onClick}/>               
        <label htmlFor="search-btn">Toggle</label>  
        <p>{this.state.searched}</p>       
      </div>
    );
  }
}

export default BlogSearch;