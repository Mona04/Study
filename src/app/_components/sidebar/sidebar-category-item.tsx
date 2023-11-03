'use client'

import {useState, useContext, useEffect} from "react"
import {usePathname} from 'next/navigation'
import Link from "nextwrap/link"
import {Context} from '@/context/context'

import {RiArrowDownSLine, RiArrowRightSLine} from 'react-icons/ri'

interface Props {
  slug: string,
  label: string,
  depth: number, 
  refCount: number,
  children?: React.ReactNode | null
}


export default function CategoryItem({children, label, refCount, slug, depth} : Props) {
  
  const pathname = usePathname()
  const isLeaf = children == null;
  const isCurrent = pathname.split('/')[depth+1]?.toUpperCase() === label.toUpperCase();

  const [isCollapsed, setIsCollaped] = useState(!isCurrent || isLeaf);
	const context = useContext(Context);

  useEffect(()=>{
    const disposables : (IDisposable|undefined)[] = [];

    return ()=>{
      disposables.map(v=>v?.dispose());
    }
  }, []);

  const onClickToggle = (event:  React.MouseEvent<HTMLElement>) => {      
    setIsCollaped(!isCollapsed);
  };

  const onClickLink = () => {
    context?.statemgr.closeAll();
  };


  return (
    <>
      {/*safelist 쓰기 싫어서 주석으로 처리함 tw-ml-0 tw-ml-2 tw-ml-4 tw-ml-6 tw-ml-8 tw-ml-10*/}
      {/*https://stackoverflow.com/questions/69687530/dynamically-build-classnames-in-tailwindcss*/}
      <div className={`
              tw-flex tw-flex-row tw-justify-start
              tw-mb-1
              ${depth < 1 ? "tw-font-bold" : "tw-font-normal"}
              ${depth < 1 ? "tw-text-xl desk:tw-text-lg" : depth < 2 ? "tw-text-lg : desk:tw-text-lg" : "tw-text-base desk:tw-text-base"}
           `}>       
        <button 
          className="tw-flex tw-flex-row tw-grow"
          onClick={onClickToggle}> 
          <div className="tw-self-center tw-w-6">
            { isLeaf ? <></> : isCollapsed ? <RiArrowRightSLine/> : <RiArrowDownSLine/>} 
          </div>
          <Link              
              className={`tw-font-sans hover:tw-font-bold tw-align-baseline
                         ${isCurrent ? "tw-text-color-primary" : "tw-text-color-text "}`}
              href={slug}
              onClick={onClickLink}>
            {`${label}${refCount > 0 ? ` (${refCount})` : ""}`}
          </Link>
        </button>
    
      </div> 
      {!isCollapsed && <div className="tw-border-l-2 tw-ml-1.5 tw-pl-1.5">{children}</div>}   
    </>
  );
}