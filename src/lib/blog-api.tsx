import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'


const postsDirectory = join(process.cwd(), '_content/blog/')

export function getDirents(path: string) {
  return fs.readdirSync(path, {"withFileTypes": true, });
}

export async function* getDirentsRecursive(path: string) : AsyncGenerator<fs.Dirent>
{
  const dirents = getDirents(path)
  for(const dirent of dirents)
  {
    console.log(dirent.path)
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
