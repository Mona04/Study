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

  return (
    <Image src={`${process.env.BASE_PATH}${src}`} alt={alt} width={width} height={height} fill={fill}>
      {children}
    </Image>
  )
}