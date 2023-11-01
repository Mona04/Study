'use client'

import {useContext, useState, useEffect} from "react"

import { BlogPost } from "utils/content-helper"
import style from "./toc.module.scss"

interface Props{
  className? : string | undefined,
  post : BlogPost,
}

export default function TOCView({className, post}:Props) {
  
  const [toc, setTOC] = useState("");
	
  useEffect(()=>{
    const disposables : (IDisposable|undefined)[] = [];

    const content = document.getElementsByTagName("article")?.[0];
    if(content != null)
    {
        const headers = content.getElementsByTagName('h2');
        console.log(content)
        console.log(headers)
        setTOC("!!!")
        //content.getEle
    }

    return ()=>{
      disposables.map(v=>v?.dispose());
    }
  });

  return (
    /* A fixed-position element without a specified top value 
        defaults to a position that may not be 0, depending on the situation*/
		<>
            {"asfdasdfasdf"}
            {toc}
		</>

  );
}