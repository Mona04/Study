import Link from "nextwrap/link"
import Image from "nextwrap/image"
import { WithTooltip } from '@/components/tooltip/tooltip'

interface Props {
  title: string,
  slug: string,
  description?: string,
  thumbnail?: string,
}

/**
 * post item.
 * @param param0 
 * @returns 
 */
export default function PostItem({slug, title, description, thumbnail}:Props)
{
  // 
  return (
    <WithTooltip>
    <article className="mobile:tw-h-24 tw-m-1
                        tw-border-2 tw-rounded-2xl tw-border-color-border
                        hover:tw-border-color-primary hover:tw-transition-all hover:tw-duration-500">
      <Link href={encodeURI(slug)}>
        <div className="tw-grid mobile:tw-grid-cols-3 tw-m-2 tw-overflow-hidden">
          <div className="mobile:tw-col-span-1 mobile:tw-h-20 desk:tw-max-h-40 desk:tw-mb-2 w-m-1 tw-border-2 tw-border-color-border ">
            <Image className="tw-h-full tw-w-full" 
                   src={thumbnail ?? "/images/empty-300x200.jpg"} alt="Thumbnail" 
                   width={256} height={256} priority={true}/>
          </div>
          <div className="mobile:tw-col-span-2 mobile:tw-h-20 desk:tw-max-h-36 tw-mx-2 tw-overflow-hidden">
            {/* h4 위 아래에 기본으로 margin padding 붙는거 제거 + Tooltip */}
            <h4 className="tw-mb-0 tw-mt-0 
                           tw-whitespace-nowrap tw-text-ellipsis tw-overflow-hidden tooltip-hover">       
              {title}
            </h4>   
            <p className="tw-text-color-text-light tw-text-sm 
                          tw-text-ellipsis tw-overflow-hidden tooltip-hover">
              {description}
            </p>  
          </div>
        </div>
      </Link>
    </article>
    </WithTooltip>
  )
}