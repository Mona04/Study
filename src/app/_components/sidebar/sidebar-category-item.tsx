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
  const isCurrent = pathname.split('/')[depth+1]?.toUpperCase() === label.toUpperCase();

  return (
    <div>
      {/*safelist 쓰기 싫어서 주석으로 처리함 tw-ml-0 tw-ml-2 tw-ml-4 tw-ml-6 tw-ml-8 tw-ml-10*/}
      {/*https://stackoverflow.com/questions/69687530/dynamically-build-classnames-in-tailwindcss*/}
      <div className={`
              tw-ml-${(depth*2).toString()} 
              ${depth < 1 ? "tw-font-bold" : "tw-font-normal"}
              ${depth < 1 ? "tw-text-xl" : depth < 2 ? "tw-text-lg" : "tw-text-base"}
           `}>
        <Link href={slug} 
              className={`tw-font-sans hover:tw-font-bold ${isCurrent ? "tw-text-color-primary" : "tw-text-color-text-light "}`}>
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