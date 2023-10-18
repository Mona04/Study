'use client'

import {useState, useContext, useEffect} from "react"
import {usePathname} from 'next/navigation'

import Link from "nextwrap/link"
import {RiArrowDownSLine, RiArrowUpSLine} from 'react-icons/ri'

import style from "./sidebar.module.scss"

interface Props {
    slug: string,
    label: string,
    depth: number, 
    refCount: number,
    children?: React.ReactNode | null
}

export default function CategoryItem({children, label, refCount, slug, depth} : Props) {
  const [isCollapsed, setIsCollaped] = useState(true);
  const pathname = usePathname()

  useEffect(()=>{
    const disposables : (IDisposable|undefined)[] = [];

    return ()=>{
      disposables.map(v=>v?.dispose());
    }
  });

  const onClick = (event:  React.MouseEvent<HTMLElement>) => {      
    setIsCollaped(!isCollapsed);
  };

  const isLeaf = children == null;
  
  return (
    <div>
      <div className={`tw-ml-${(depth*2).toString()} ${depth < 1 ? "tw-font-bold" : "tw-font-weigh"} tw-hover:tw-font-extra-bold"`}>
        <Link href={slug} className="tw-font-sans">
          {label}
        </Link>
        <button 
          className="tw-flex tw-w-full tw-border-b-2"
          onClick={onClick}>
          { isLeaf ? <></> : isCollapsed ? <RiArrowUpSLine/> : <RiArrowDownSLine/>} 
        </button>
      </div> 
      {!isCollapsed && <div>{children}</div>}   
    </div>
  );
}