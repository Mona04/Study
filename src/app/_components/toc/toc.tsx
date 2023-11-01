'use client'

import {useContext, useState, useEffect} from "react"

import { BlogPost } from "utils/content-helper"
import style from "./toc.module.scss"

interface Props{
  className? : string | undefined,
  post : BlogPost,
}

interface MakeTOCVariable{
  titles: string[],
  idx: number
}

function calcDepth(title:string) { return [...title].reduce((a, v) => (v === '#' ? a + 1 : a), 0);}

function TableItem(variable: MakeTOCVariable)
{
  const idx = variable.idx;
  const title = variable.titles[idx];
  const depth = calcDepth(title);
  variable.idx+=1;

  const childs = [];
  while(variable.titles.length > variable.idx && calcDepth(variable.titles[variable.idx]) > depth)
  {
    childs.push(TableItem(variable));
  }
  return (
    <li key={`toc-item-id-${title}${idx}`}>
      <h4>{variable.titles[idx]}{depth}</h4>
      { childs.length > 0 && <ul>{childs}</ul>}
    </li>
  )
}

function TOCList(titles: string[])
{
  let variable = {titles:titles, idx:0};
  const items = [];
  for(; variable.idx < titles.length; )
    items.push(TableItem(variable));
  return (
    <ul>{items}</ul>
  )
}

export default function TOCView({className, post}:Props) {
  
  //const [toc, setTOC] = useState("");
	
  const titles = post.raw.split(`\n`).filter((t) => t.includes('# '));

  var toc = TOCList(titles);

  useEffect(()=>{
    const disposables : (IDisposable|undefined)[] = [];

    const content = document.getElementsByTagName("article")?.[0];
    if(content != null)
    {
        const headers = content.getElementsByTagName('h2');

        //setTOC("!!!")
        //content.getEle
    }

    return ()=>{
      disposables.map(v=>v?.dispose());
    }
  });

  return (
    /* A fixed-position element without a specified top value 
        defaults to a position that may not be 0, depending on the situation*/
		<>
      {toc}
		</>

  );
}