import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = join(process.cwd(), '_content/')

export async function getDirents(path: string) {
  return new Promise<fs.Dirent[]>((resolve, reject)=>{
    fs.readdir(path, {"withFileTypes": true}, (err, files)=>{
      resolve(files);
    });
  });  
}

export async function* getDirentsRecursive(path: string) : string[]
{
  const dirents = await getDirents(postsDirectory)
  for(const dirent of dirents)
  {
    const res = join(path, dirent.name)
    if(dirent.isDirectory()) {
      yield* getDirentsRecursive(res);
    } else{
      yield res;
    }
  }
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  type Items = {
    [key: string]: string
  }
  //console.log(slug);
  return null;
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



export async function getAllPosts(fields: string[] = []) {
  let a = getDirentsRecursive(postsDirectory)
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