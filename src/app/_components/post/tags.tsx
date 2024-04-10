'use client'
import Link from "nextwrap/link"
import { useContext } from "react"
import { Context } from "@/context/context"

function Tag({tag}:{tag:string}) 
{
  const context = useContext(Context);

  const onClick = ()=>{
    context?.statemgr.openSearch();
    context?.searchmgr.searchByTags([tag]);
  };

  return (
    <div className="tw-ml-2 tw-pl-2 tw-pr-2               
                    tw-rounded-md
                    tw-bg-color-text-bg hover:tw-bg-color-text-bg-dimmed
                    ">
      <p className="tw-inline" onClick={onClick}>
        {tag}
      </p>
    </div>
  )
}

function Tags({className, tags}: {className?: string, tags: string[]|undefined}) {

  return (
    <div className={`tw-flex tw-flex-row tw-text-sm ${className}`}>
      <i className="material-symbols-outlined md-sm tw-self-center
                    tw-w-5">
        Sell
      </i> 
      <div className='tw-color-text-dimmed'>Tags :</div>
      {
        tags?.map(tag=><Tag key={tag} tag={tag}/>)
      }
    </div>
  );
}

export default Tags;