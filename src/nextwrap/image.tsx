import Image from 'next/image'


export default (
  {
    children = null, src, alt, 
    width = undefined, height = undefined, fill = undefined
  }: 
  {
    children?: React.ReactNode | null, 
    src: string, alt: string, 
    width?: number | undefined, height?: number | undefined,
    fill?: boolean | undefined
  })=>{
  const cur_path : string = process.env.NODE_ENV == 'production' ? 
    `${src}` :
    `${process.env.NEXT_PUBLIC_BASE_PATH}${src}`;
    
  return (
    <Image src={cur_path} alt={alt} width={width} height={height} fill={fill}>
      {children}
    </Image>
  )    
}