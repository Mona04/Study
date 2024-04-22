'use client'

import { useContext } from "react"
import { Context } from "@/context/context"
import { getPostsByPath } from "content-manager";

function Tag({tag, label}:{tag:string, label:string}) 
{
  const context = useContext(Context);

  const onClick = ()=>{
    context?.statemgr.openSearch();
    context?.searchmgr.searchByTags([tag]);
  };

  return (
    <div className="tw-ml-2 tw-pl-2 tw-pr-2 tw-inline-block
                    tw-rounded-md
                    tw-bg-color-text-bg hover:tw-bg-color-text-bg-dimmed
                    "
         onClick={onClick}>
      <p className="tw-inline">
        {label}
      </p>
    </div>
  )
}

function Tags({className}: {className?: string}) 
{
  const tags : {[tag:string]:{tag:string, num:number}} = {};
  getPostsByPath('.').filter(p=>p.useSearch).forEach(post => {
    post.tags?.forEach(tag=>{
      if(tags[tag] == undefined)
      {
        tags[tag] = {tag:tag, num:0};
      }
      tags[tag]!.num++;
    })
  });

  return (
    <div className={`tw-flex tw-flex-row tw-text-sm ${className}`}>
      <div className='tw-color-text-dimmed'>Tags:</div>
      <div className="">
      {
        Object.values(tags).map(tag=><Tag key={tag.tag} tag={tag.tag} label={`${tag.tag} (${tag.num})`}/>)
      }
      </div>
    </div>
  );
}

export default function TagsView() {
  return (
    <section className='content'>
      <h1 className="mobile:tw-text-2xl tw-text-3xl tw-leading-normal tw-font-bold tw-mt-0" itemProp='headline'>{"Tags"}</h1>
      <Tags />
    </section>
  )
}