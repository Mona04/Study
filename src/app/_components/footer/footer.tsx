import Link from 'nextwrap/link'
import {AUTHOR, GIT} from 'configs/blog-config.json'
import {AiFillGithub} from 'react-icons/ai'

function Follow({className}:{className?: string}){
  return (
    <div className={className}>
      <Link href={GIT} target='_self' className='tw-flex tw-self-center'>
        <AiFillGithub className='tw-self-center'/>
        <div className='tw-ml-1 tw-font-bold'>
          GITHUB
        </div>
      </Link>
    </div>
  )
}

function Ment({className}:{className?: string})
{ 
  var currentdate = new Date(); 
  return (
    <div className={className}>
      {`© ${currentdate.getFullYear()} ${AUTHOR}. Powered by `}
      <Link href="https://nextjs.org/" target="_blank">
        NextJS
      </Link>
      .
    </div>
  )
}

function BuildTime({className}:{className?: string})
{ 
  var date = new Date(); 
  return (
    <div className={className}>
      <div className=''>
        Last Build:
      </div>
      <div className='tw-ml-1'>
        {`${date.getHours()}:${date.getMinutes()}`}
      </div>
      <div className='tw-ml-1'>
        {`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`}
      </div>
    </div>
  )
}

export default function Footer({className}: {className?:string|undefined})
{
  return (
    <footer className={className}>
      <div className='tw-backdrop-brightness-95  tw-text-xs'>
        <div className='tw-flex tw-p-4 tw-mr-4 tw-ml-4
                        dark:tw-border-t-color-border dark:tw-border-t-2'>
          <div className='tw-flex-col'>
            <Follow className='tw-mb-3'/>
            <Ment className=""/>
          </div>    
          {/* build time 정보는 휴대폰에선 안보이게 (공간없음) */}
          <BuildTime className='tw-flex tw-self-end tw-ml-auto
                                phone:tw-absolute phone:tw-collapse'/>
        </div>  
      </div>
    </footer>
  );
}