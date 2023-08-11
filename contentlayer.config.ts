// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import highlight from 'rehype-prism-plus'
import title from 'rehype-code-titles'
import prettyCode from 'rehype-pretty-code'


export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  contentType: 'markdown',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
  },
}))
//https://yiyb-blog.vercel.app/posts/nextjs-contentlayer-blog

export default makeSource({
    contentDirPath: '_content', 
    documentTypes: [Post],
    markdown:{ 
      rehypePlugins: [
   
        [
          prettyCode,
          {
            showLineNumbers: true,
            grid: true,
            theme: 'rose-pine-moon',
            dark: 'github-dark-dimmed',
            light: 'github-light',
          }
        ]
      ]    
    },
    mdx:{ rehypePlugins: [highlight] }
})