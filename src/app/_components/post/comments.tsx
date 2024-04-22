'use client'

import { useEffect, useRef, useContext, useState } from "react"
import { Context } from '@/context/context'

export default function Comments()
{
  const context = useContext(Context);
  const ref = useRef<HTMLDivElement>(null);
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  const createScript = (isDarkMode:boolean)=>{
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';
    
    scriptElem.setAttribute('data-repo', 'Mona04/study-log');
    scriptElem.setAttribute('data-repo-id', 'R_kgDOJxjrTQ');
    scriptElem.setAttribute('data-category', 'Announcements');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOJxjrTc4Ce2KE');
    scriptElem.setAttribute('data-mapping', 'pathname');
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '1');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'top');
    scriptElem.setAttribute('data-theme', isDarkMode ? "dark" : "light");
    scriptElem.setAttribute('data-lang', 'en');
    //scriptElem.setAttribute('data-loading', 'lazy'); // 로딩 전에 theme 을 바꾸면 적용이 안되던데.
    
    ref.current.appendChild(scriptElem);
  }

  useEffect(() => {    
    const disposables : (IDisposable|undefined)[] = [];
    
    disposables.push(context?.statemgr.registerDarkModeEvent(v=>setDarkMode(v)));
    setDarkMode(context?.statemgr.IsDarkMode() ?? false);
    createScript(context?.statemgr.IsDarkMode() ?? false);
    
    return ()=>{
      disposables.map(v=>v?.dispose());
    }
  }, [])

    // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: {theme:isDarkMode ? "dark" : "light"}}}, 
      'https://giscus.app'
    );
  }, [isDarkMode]);
      
  return (
    <>
      <section ref={ref} />
    </>
  )
}