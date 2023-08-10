// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import highlight from 'rehype-highlight'

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
    markdown:{ rehypePlugins: [highlight] },
    mdx:{ rehypePlugins: [highlight] }
  })