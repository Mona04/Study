'use client'

import {useState, useContext, useEffect} from "react"
import {usePathname} from 'next/navigation'
import {Context} from "@/context/context"


export default function Interact({children,}: {children: React.ReactNode}) {
  const [visible, setvisible] = useState(false);
  const context = useContext(Context);
  const pathname = usePathname()
  console.log(pathname);
  useEffect(()=>{
    const disposables : (IDisposable|undefined)[] = [];

    // 버튼 이벤트랑 연결
    disposables.push(context?.statemgr.registMenuEvent(v=>{setvisible(v)}));
    console.log("asdf");
    return ()=>{
      disposables.map(v=>v?.dispose());
    }
  });


  return (
    <>
      {visible && children}   
    </>
  );
}