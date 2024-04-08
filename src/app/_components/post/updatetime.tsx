export default function UpdateTime({className, date}: {className?:string, date:Date}) 
{
  return (
  <div className={`${className}`}>
    <div className='tw-flex tw-flex-row tw-text-sm'>
      <i className="material-symbols-outlined md-sm tw-self-center
                    tw-w-5">
        schedule
      </i>
      <div className='tw-color-text-dimmed'>Posted  :</div>
      <div className='tw-ml-2'>
        {date.toLocaleDateString()}
      </div>
    </div>
  </div>
  )
}