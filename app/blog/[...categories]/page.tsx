
import * as Blog from 'lib/mdpost/blog-api'
import {HotReloader} from 'lib/mdpost/hot-reloader'
import watcher from 'lib/mdpost/watcher'
import {sleep} from "utils/utils"


export default async function Page({ params }: { params: { categories: string[], name: string} }) {

  var a = await fetch("http://localhost:4000/", {next: {revalidate: 11160, tags:['mdpost']}});
      
  return <div>
    <div>My Slugs: {params.categories}</div>
    <div>My Slugs: {params.name}</div>
    <div>My Slugs: {Date.now()}</div>
    <HotReloader key='my-hot-reloader'/>

  </div>
}

export const dynamicParams = false // true | false,
//export const revalidate = 1 // revalidate this page every 60 seconds
//export const dynamic = 'error'
export async function generateStaticParams() {
  watcher('_content')
  //var a = await fetch('http://localhost:4000/blog/hmy-second-post').then((res) => console.log(res))
  //await sleep(5000);
  console.log("asdf")
  return (await Blog.posts("_content/blog/", { bUseCache: false, cachePath: './src/_cache/posts'})).map((post) => ({
    categories: post,
    name: "aasfd"
  }))
}

