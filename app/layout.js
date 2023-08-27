import { allPosts } from '@/contentlayer/generated'
import matter from 'gray-matter'
import remarkFrontmatter from 'remark-frontmatter'
import remarkParse from 'remark-parse'
import fs from 'fs'
import { unified } from 'unified';

export default function aaa() 
{
    let str = fs.readFileSync("_content/end-with-quote.md", {encoding: 'utf-8', flag: 'r'});

    let builder = 
    unified()
    .use(remarkFrontmatter)
    .use(remarkParse)


    let aaa = builder.parse(str);
    //console.log(aaa)

    allPosts.map(v => console.log(v.body.html))

    return (
        <></>
    )
}