'use client'

import {useContext, useState, useEffect, useRef} from "react"

import {unified} from "unified"
import type {Heading, Text} from 'mdast'
import rm_parse from "remark-parse"
import {visit} from "unist-util-visit"

import style from "./toc.module.scss"

const MAX_DEPTH = 4;

interface Props{
  className? : string | undefined,
  mdSrc : string,
}

interface MakeTOCVariable{
  headers: Heading[],
  idx: number,
  activeID: string,
}

const useIntersectionObserver = (
  setActiveId: React.Dispatch<React.SetStateAction<string>>,
  headers: string[]
) => {

  const headerID2Idx : { [id:string]: number | undefined } = {};
  headers.forEach((header, idx) => { headerID2Idx[header] = idx;})

  useEffect(() => {
    // callback은 intersectionObserver로 관찰할 대상 비교 로직
    const callback: IntersectionObserverCallback = (headings) => {
      console.log(headings.length)
      // 첨에 등록한 전체 헤딩이 모두 들어오고 
      // 그 다음부터는 화면에 새로 오는애들이 옴.
      headings.map(heading => {
        const id = heading.target.id;
        console.log(id)
        const idx = headerID2Idx[id];
        if(idx == undefined) return;
        if(heading.isIntersecting)
        {
          setActiveId(id);
        }
        else{
          //setActiveId(headers[])
        }
      })
    };

    const observer = new IntersectionObserver(callback, {
      // 
      rootMargin: '-70px 0px -50% 0px',
      threshold: [0, 1.0]
    });

    // 제목 태그들을 다 등록
    Array.from(document.querySelectorAll('h1, h2, h3, h4')).forEach((element) => observer.observe(element));

    // 컴포넌트 언마운트시 observer의 관찰을 멈춘다.
    return () => observer.disconnect();
  }, []);
};

function getText(header: Heading) : string { return header.children.length > 0 && header.children[0].type == 'text' ? header.children[0].value : "";}

function TableItem(variable: MakeTOCVariable)
{
  const idx = variable.idx;
  const header = variable.headers[idx];
  const headerText = getText(header);
  const headerID = headerText.replaceAll(' ', '-');
  const depth = header.depth;

  variable.idx+=1;

  const childs = [];
  while(variable.headers.length > variable.idx && variable.headers[variable.idx].depth > depth)
  {
    childs.push(TableItem(variable));
  }
  
  const isLeaf = childs.length == 0;
  const isHighlighted = variable.activeID === headerID;
 
  return (
    <li key={`toc-item-id-${headerText}${idx}`} className={isHighlighted ? style.selected : ""}>
      <a href={`#${headerID}`} className="tw-scroll-smooth">{headerText}</a>
      { !isLeaf && <ul>{childs}</ul>}
    </li>
  )
}

function TOCList(headers: Heading[], activeID: string)
{  
  let variable : MakeTOCVariable = {
    headers:headers, 
    idx:0, 
    activeID:activeID 
  };
  const items = [];
  
  for(; variable.idx < headers.length; )
    items.push(TableItem(variable));
  
    return (
    <ul>{items}</ul>
  )
}

export default function TOCView({className, mdSrc}:Props) {
  
  const [activeID, setActiveID] = useState('');
	
  const headers : Heading[] = [];
  const mdAst = unified().use(rm_parse).parse(mdSrc);
  visit(mdAst, 'heading', (node) => {
    if(node.depth <= MAX_DEPTH)
    {
        headers.push(node);
    }
  });
  var toc = TOCList(headers, activeID);

  useIntersectionObserver(setActiveID, headers.map(h=>getText(h)));
  
  return (
	  <section className={style.toc}>
      <header>
        <h4>On This Page</h4>
      </header>
      {toc}
	  </section>
  );
}