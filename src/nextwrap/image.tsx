import Image from 'next/image'
import ExportedImage from 'next-image-export-optimizer'
import { getBasePath } from "utils/utils"

export default (
  {
    children = null, src, alt, 
    width = undefined, height = undefined, fill = undefined, priority = false
  }: 
  {
    children?: React.ReactNode | null, 
    src: string | undefined, 
    alt: string, 
    width?: number | undefined, 
    height?: number | undefined,
    fill?: boolean | undefined,
    priority?: boolean,
  })=>{

  const cur_path : string = `${getBasePath()}${src}`;
  
  return (
    <ExportedImage src={cur_path} alt={alt} 
                   width={width} height={height} fill={fill}
                   priority={priority}>
      {children}
    </ExportedImage>
  )    
}