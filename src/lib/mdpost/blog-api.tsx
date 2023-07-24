import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { cache } from 'react'
import { remark } from 'remark'
import html from 'remark-html'
import { promises } from 'dns'
import {splitExtension} from "utils/utils"
import { allPosts, Post } from '@/contentlayer/generated'

const postsDirectory = join(process.cwd(), '_content/blog/')

export function getDirents(path: string) {
  return fs.readdirSync(path, {"withFileTypes": true, });
}

export async function* getDirentsRecursive(path: string) : AsyncGenerator<fs.Dirent>
{
  const dirents = getDirents(path)
  for(let dirent of dirents)
  {
    dirent.path = join(path, dirent.name);
    if(dirent.isDirectory()) {
      yield* getDirentsRecursive(dirent.path);
    } else{
      yield dirent;
    }  
  }
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  if(!slug.match(/.md$/)){
    return items;
  }
  
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })

  return items
}

export function search(keyword:string) : Post[] {
  var reg = new RegExp(keyword, 'gi')
  return allPosts.filter((post, index, posts)=>{
    return post.title.match(reg);
  });
}

export async function getAllPosts(fields: string[] = []) {
  
  for await (const a of getDirentsRecursive(postsDirectory))
  {
    //console.log(a.);
    //console.log(a.name + " " + fs.statSync(a.path).mtime)
  }
  return null;
  //.map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
  //.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  //return posts
}

//export default async function markdownToHtml(markdown: string) {
//  const result = await remark().use(html).process(markdown)
//  return result.toString()
//}

export function watchAndUpdate(path: string)
{
  console.log("asfd")
  //fs.watch(path, function (event, filename) {
  //  console.log('event is: ' + event);
  //  if (filename) {
  //      console.log('filename provided: ' + filename);
  //  } else {
  //      console.log('filename not provided');
  //  }
  //});
}

export const posts = cache(async (
  path : string, 
  opt : { bUseCache: boolean, cachePath: string}) 
  : Promise<string[][]> => 
{  
  let posts : string[][] = [];

  let bReload = !opt.bUseCache || !fs.existsSync(opt.cachePath);

  if(bReload){
    console.log("Search Posts...")

    for await (const dirent of getDirentsRecursive(path))
    {    
      let dirs = dirent.path.split(/[\\\/]/);
      let ff = splitExtension(dirs.slice(-1)[0]);
      if(ff != undefined && ff[1].toLowerCase() == 'md'){    
        posts.push([...dirs.slice(2, -1), ff[0]] );
      }
    }

    fs.writeFileSync(opt.cachePath, JSON.stringify(posts), {});
  }
  else if(!fs.existsSync(opt.cachePath)){
    let readStream = fs.readFileSync(opt.cachePath);
    posts = JSON.parse(readStream.toString());
  }

  //global.allPosts = posts;
  
  return posts;
})

export const fff = cache(async(id:number) : Promise<number> => { console.log(id); return 1;});