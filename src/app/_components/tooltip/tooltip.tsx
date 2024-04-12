'use client'
import { useEffect, useState, useRef, MutableRefObject } from "react";
import { throttle } from "utils/utils";


export  function Tooltip(
  {hoverRef, children}:
  {children:React.ReactNode, hoverRef:MutableRefObject<HTMLDivElement|null>}
){
  const [isOpen, setIsOpen] = useState<boolean>();
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 })
  const isOut = useRef(true);
  const IsOut = (v:any)=>v.current;
  //https://stackoverflow.com/questions/66382585/tooltip-inside-a-scrollable-component
  const onMove = (o:HTMLElement, e:MouseEvent) => {
    isOut.current = false;
    setCursorPosition({left:e.pageX+10, top:e.pageY-30})
    setIsOpen(false);

    setTimeout(()=>{   
      if(IsOut(isOut)) return;
      setIsOpen(true);
    }, 100);  
  };
  const onLeave = (o:HTMLElement) => {
    isOut.current = true;
    setIsOpen(false);
  };
  useEffect(()=>{
    const callbacks:(()=>void)[] = [];
    
    const o = hoverRef.current!
    
    const _move = (e:any)=>{onMove(o, e);}
    const _leave = ()=>{onLeave(o);};
    
    o.addEventListener('mousemove', _move);
    o.addEventListener('mouseleave', _leave);
    
    callbacks.push(()=>{        
      o.removeEventListener('mousemove', _move);
      o.removeEventListener('mouseleave',_leave);
    });

    return ()=>{callbacks.forEach(c=>c());}
  }, []);

  return (
    <div className={`tooltip ${isOpen ? "go" : ''} `} 
         style={{position: "absolute", ...cursorPosition }}>
      {children}
    </div>
  )
}

export function WithTooltip({children, tooltip}:{children:React.ReactNode, tooltip:string|undefined}){
  const hoverRef = useRef<HTMLDivElement|null>(null);
  return (
    <div ref={hoverRef}>
    {children}
    <Tooltip hoverRef={hoverRef}>{tooltip}</Tooltip>
    </div>
  )
}
