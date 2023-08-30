import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import prettyCode from 'rehype-pretty-code'


export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.(md|mdx)`,
  contentType: 'mdx',
  fields: {
    title:        { required: true,  type: 'string',  },
    date:         { required: true,  type: 'date',     },
    description:  { required: false, type: 'string',   },
    tags:         { required: false, type: 'list', of: {type: 'string'} }
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
          // https://rehype-pretty-code.netlify.app/
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
                tagName: 'copy',
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