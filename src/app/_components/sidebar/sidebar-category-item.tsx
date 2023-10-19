'use client'

import {useState, useContext, useEffect} from "react"
import {usePathname} from 'next/navigation'

import Link from "nextwrap/link"
import {RiArrowDownSLine, RiArrowRightSLine} from 'react-icons/ri'

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
    <div className={`tw-ml-${(depth*2).toString()} tw-mb-1`}>
      {/*safelist 쓰기 싫어서 주석으로 처리함 tw-ml-0 tw-ml-2 tw-ml-4 tw-ml-6 tw-ml-8 tw-ml-10*/}
      {/*https://stackoverflow.com/questions/69687530/dynamically-build-classnames-in-tailwindcss*/}
      <div className={`
              tw-flex tw-flex-row
              tw-ml-${(depth*2).toString()} tw-mb-1
              ${depth < 1 ? "tw-font-bold" : "tw-font-normal"}
              ${depth < 1 ? "tw-text-lg" : depth < 2 ? "tw-text-base" : "tw-text-sm"}
           `}>       
        <Link href={slug} 
              className={`tw-font-sans hover:tw-font-bold tw-align-baseline
                         ${isCurrent ? "tw-text-color-primary" : "tw-text-color-text "}`}>
          {`${label}${refCount > 0 ? ` (${refCount})` : ""}`}
        </Link>
        <button 
          className="tw-grow tw-flex tw-flex-row tw-self-center"
          onClick={onClick}> 
          <div className="tw-ml-auto">
            { isLeaf ? <></> : isCollapsed ? <RiArrowRightSLine/> : <RiArrowDownSLine/>} 
          </div>
        </button>
      </div> 
      {!isCollapsed && <div className="tw-border-l-2">{children}</div>}   
    </div>
  );
}