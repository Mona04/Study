'use client'
import * as Blog from 'lib/mdpost/blog-api'
import { useEffect } from 'react'


export function HotReloader(){
  useEffect(() => {

    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    }});
  //await Blog.fff(12)
  return <div >
    <div>asdf</div>
  </div>
}
