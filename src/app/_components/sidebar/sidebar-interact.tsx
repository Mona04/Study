'use client'

import {useState, useContext, useEffect} from "react"
import {Context} from "@/context/context"


export default function Interact({children,}: {children: React.ReactNode}) {
  const [visible, setvisible] = useState(false);
  const context = useContext(Context);

  useEffect(()=>{
    const disposables : (IDisposable|undefined)[] = [];

    // 버튼 이벤트랑 연결
    disposables.push(context?.statemgr.registMenuEvent(v=>{setvisible(v)}));

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