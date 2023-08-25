// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import prettyCode from 'rehype-pretty-code'


export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.(md|mdx)`,
  contentType: 'mdx',
  fields: {
    title:        { type: 'string',   required: true },
    date:         { type: 'date',     required: true },
    description:  { type: 'string',   required: false},
    excerpt:      { type: 'string',   required: false}
  },  
  computedFields: {
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
  },
}))


export default makeSource({
    contentDirPath: '_content', 
    documentTypes: [Post],
    mdx:{ 
      rehypePlugins: [
        [
          prettyCode,
          {
            showLineNumbers: true,
            grid: true,
            theme: {
              dark: 'rose-pine-moon',
            },
            onVisitTitle(element:any) {
              element.children.push({
                type: 'element',
                tagName: 'div',
                properties: { className: ['copy'] },
                children: [{ type: 'text', value: 'Copy' }]
              });
            },
          }
        ]
      ]    
    },
    markdown:{ rehypePlugins: [prettyCode] }
})