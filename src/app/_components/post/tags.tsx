import Link from "nextwrap/link"

function Tag({tag}:{tag:string}) {
  return (
    <div className="tw-ml-2 tw-pl-1 tw-pr-1
                    
                    tw-border-color-border tw-border-2
                    ">
      <Link className="" href="asdf">
        {tag}
      </Link>
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