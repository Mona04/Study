'use client'

import { useContext } from "react"
import { Context } from "@/context/context"
import { getPostsByPath } from "content-manager";

function Tag({tag}:{tag:string}) 
{
  const context = useContext(Context);

  const onClick = ()=>{
    context?.statemgr.openSearch();
    context?.searchmgr.searchByTags([tag]);
  };

  return (
    <div className="tw-ml-2 tw-pl-2 tw-pr-2 tw-inline        
                    tw-rounded-md
                    tw-bg-color-text-bg hover:tw-bg-color-text-bg-dimmed
                    ">
      <p className="tw-inline" onClick={onClick}>
        {tag}
      </p>
    </div>
  )
}

function Tags({className}: {className?: string}) 
{
  const tags : {[tag:string]:number} = {};
  getPostsByPath('.').forEach(post => {
    post.tags?.forEach(tag=>{
      if(tags[tag] == undefined)
      {
        tags[tag] = 0;
      }
      tags[tag]++;
    })
  });

  return (
    <div className={`tw-flex tw-flex-row tw-text-sm ${className}`}>
      <div className='tw-color-text-dimmed'>Tags:</div>
      <div className="tw-mx-2 tw-grid tw-grid-flow-row-dense">
      {
        Object.keys(tags).map(tag=><Tag key={tag} tag={tag}/>)
      }
      </div>
    </div>
  );
}

export default Tags;