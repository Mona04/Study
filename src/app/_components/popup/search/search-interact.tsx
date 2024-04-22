'use client'

import {useState, useContext, useEffect} from "react"
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
  }, []);

  return (
    <>
      {visible && children}   
    </>
  );
}