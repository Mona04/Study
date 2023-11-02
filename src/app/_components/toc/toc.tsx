'use client'

import {useContext, useState, useEffect} from "react"
import {usePathname} from 'next/navigation'

import {unified} from "unified"
import type {Heading, Text} from 'mdast'
import rm_parse from "remark-parse"
import {visit} from "unist-util-visit"

import Link from "nextwrap/link"
import { BlogPost } from "utils/content-helper"
import style from "./toc.module.scss"

interface Props{
  className? : string | undefined,
  post : BlogPost,
}


interface MakeTOCVariable{
  headers: Heading[],
  idx: number,
  currentDirectory: string,
}

function getText(header: Heading) : string { return header.children.length > 0 && header.children[0].type == 'text' ? header.children[0].value : "";}

function TableItem(variable: MakeTOCVariable)
{
  const idx = variable.idx;
  const header = variable.headers[idx];
  const headerText = getText(header);
  const depth = header.depth;

  variable.idx+=1;

  const childs = [];
  while(variable.headers.length > variable.idx && variable.headers[variable.idx].depth > depth)
  {
    childs.push(TableItem(variable));
  }

  return (
    <li key={`toc-item-id-${headerText}${idx}`}>
      <a href={`${variable.currentDirectory}#${headerText}`} className="tw-scroll-smooth">{headerText}</a>
      { childs.length > 0 && <ul>{childs}</ul>}
    </li>
  )
}

function TOCList(headers: Heading[])
{  
  const pathname = usePathname();
  let variable : MakeTOCVariable  = {headers:headers, idx:0, currentDirectory:pathname };
  const items = [];
  
  for(; variable.idx < headers.length; )
    items.push(TableItem(variable));
  
    return (
    <ul>{items}</ul>
  )
}

export default function TOCView({className, post}:Props) {
  
  //const [toc, setTOC] = useState("");
	
  const headers : Heading[] = [];
  const mdAst = unified().use(rm_parse).parse(post.raw);
  visit(mdAst, 'heading', (node) => {
    if(node.depth < 6)
    {
        headers.push(node);
    }
  });
  var toc = TOCList(headers);

  useEffect(()=>{
    const disposables : (IDisposable|undefined)[] = [];
    return ()=>{
      disposables.map(v=>v?.dispose());
    }
  });
  
  return (
    /* A fixed-position element without a specified top value 
        defaults to a position that may not be 0, depending on the situation*/
		<section className={style.toc}>
      <h4>On This Page</h4>
      {toc}
		</section>

  );
}