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
    `${process.env.BASE_PATH}${src}` :
    `${src}`;
    
  return (
    <Image src={cur_path} alt={alt} width={width} height={height} fill={fill}>
      {children}
    </Image>
  )    
}