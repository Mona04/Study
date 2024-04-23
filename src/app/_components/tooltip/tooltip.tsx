'use client'

import { useEffect, useState, useRef, MutableRefObject } from "react";
import { throttle } from "utils/utils";
import style from './tooltip.module.scss'

interface POS {
  top: string|number,
  left: string|number,
  right: string|number,
}

export function Tooltip(
  {hoverRef}:
  {hoverRef:MutableRefObject<HTMLDivElement|null>}
){
  const [content, setContent] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>();
  const [isLeft, setIsLeft] = useState<boolean>();
  const [cursorPosition, setCursorPosition] = useState<POS>({ top: 'auto', left: 'auto', right:'auto' })
  const isOut = useRef(true);
  const IsOut = (v:any)=>v.current;
  
  //https://stackoverflow.com/questions/66382585/tooltip-inside-a-scrollable-component
  const onMove = ( e:MouseEvent) => {
    if(hoverRef.current == null) return;

    const owner = hoverRef.current;
    
    const o : HTMLElement = e.target as HTMLElement;
    const pos : POS= { 
      top: e.offsetY  + o.offsetTop, 
      left: e.offsetX + o.offsetLeft, 
      right: 'auto', };
    if(owner.clientWidth - (pos.left as number) < owner.clientWidth/3)
    {
      pos.right = owner.clientWidth - (pos.left as number);
      pos.left = 'auto';
      setIsLeft(false);
    }
    else{
      setIsLeft(true);
    }

    setContent(o.innerHTML)
    setIsOpen(false);
    
    setTimeout(()=>{   
      if(IsOut(isOut)) return;
      setCursorPosition(pos)
      setIsOpen(true);
    }, 100);  
  };
  const onEnter = (e:MouseEvent) => {
    isOut.current = false;
  }
  const onLeave = (e:MouseEvent) => {
    isOut.current = true;
    setIsOpen(false);
  };

  useEffect(()=>{
    const callbacks:(()=>void)[] = [];
    
    const o = hoverRef.current!
    const _enter = (e:any)=>onEnter(e);
    const _move = throttle((e:any)=>onMove(e),100);
    const _leave = (e:any)=>onLeave(e);
  
    o.querySelectorAll(".tooltip-hover").forEach(node=>{
      node.addEventListener('mouseenter', _enter);
      node.addEventListener('mousemove', _move);
      node.addEventListener('mouseleave', _leave);
      callbacks.push(()=>{        
        node.removeEventListener('mouseenter', _enter);
        node.removeEventListener('mousemove', _move);
        node.removeEventListener('mouseleave',_leave);
      });      
    })

    return ()=>{callbacks.forEach(c=>c());}
  }, []);

  return (
    <div className={`${style.tooltip} ${isOpen ? style.go : ''} ${isLeft ? style.left : style.right} `} 
         style={{position: "absolute", ...cursorPosition }}>
      {content}
    </div>
  )
}

/*
여기서 wrapper div 만들어서 여기를 기준으로 tooltip 좌표를 계산하게 됨
 */
export function WithTooltip({children}:{children:React.ReactNode}){
  const hoverRef = useRef<HTMLDivElement|null>(null);
  return (
    <div className="tw-relative" ref={hoverRef}>
      {children}
      <Tooltip hoverRef={hoverRef}/>
    </div>
  )
}
