
import * as Blog from 'lib/blog-api'


//export const dynamicParams = false // true | false,
//export const dynamic = 'error'
export async function generateStaticParams() {

  //var a = await fetch('http://localhost:4000/blog/hmy-second-post').then((res) => console.log(res))
  console.log("generateStaticParams()")
  return ["aaa"]
  //return (await Blog.posts()).map((post) => ({
  //  categories: post,
  //  name: 123
  //}))
}

export default function Page({ params }: { params: { categories: string} }) {
  console.log("Page()")
  console.log(params);
  //await Blog.fff(12)
  return <div>
    <div>My Slugs: {params.categories}</div>
  </div>
}
