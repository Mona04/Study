import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = join(process.cwd(), '_content/blog/')

export async function getDirents(path: string) {
  return new Promise<fs.Dirent[]>((resolve, reject)=>{
    fs.readdir(path, {"withFileTypes": true}, (err, files)=>{
      resolve(files);
    });
  });  
}

export async function* getDirentsRecursive(path: string) : AsyncGenerator<fs.Dirent>
{
  const dirents = await getDirents(path)
  for(const dirent of dirents)
  {
    if(dirent.isDirectory()) {
      yield* getDirentsRecursive(join(path, dirent.name));
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



export async function getAllPosts(fields: string[] = []) {
  getDirentsRecursive(postsDirectory).
  .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
  .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

//export default async function markdownToHtml(markdown: string) {
//  const result = await remark().use(html).process(markdown)
//  return result.toString()
//}