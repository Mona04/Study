'use client'

import {useState, useContext, useEffect, MouseEventHandler, PointerEventHandler} from "react"
import {Context} from "@/context/context"


export default function Interact({children,}: {children: React.ReactNode}) {
  const [visible, setvisible] = useState(false);
  const context = useContext(Context);

  useEffect(()=>{
    const disposables : (IDisposable|undefined)[] = [];

    disposables.push(context?.statemgr.registSearchEvent(v=>{setvisible(v)}));
    
    return ()=>{
      disposables.map(v=>v?.dispose());
    }
  });

  const onMouseDown = (e : React.PointerEvent<HTMLDivElement>)=>{
    context?.statemgr.closeSearch();
  }

  return (
    !visible ? 
    <></> :
    <>
      <div className="tw-fixed tw-h-full tw-w-full tw-bg-color-text tw-opacity-20"
           onPointerDown={onMouseDown}/>
      {children}  
    </> 
  );
}