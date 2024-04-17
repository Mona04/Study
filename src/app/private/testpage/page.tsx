'use client'

import { useEffect, useState } from 'react'
import style from './page.module.scss'

export default function PostView() {
  const [ratio, setRatio] = useState(1);
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  
  useEffect(()=>{
    const mqString = `(resolution: ${ratio}dppx)`;
    const media = window.matchMedia(mqString);
    const onChange = () => { 
      setRatio(window.devicePixelRatio);
      setWidth(window.outerWidth)
      setHeight(window.outerHeight)
    }
    onChange();
  
    media.addEventListener("change", onChange);
    return media.removeEventListener("change", onChange);
  }, []);
  return (
    <>
      <p>{`dpr:${ratio}`}</p>
      <p>{`viewportx:${width}`}</p>
      <p>{`viewporty:${height}`}</p>
      <div className={style.test}></div>
    </>
  )
}