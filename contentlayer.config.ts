// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
<<<<<<< HEAD
import prettyCode from 'rehype-pretty-code'
=======
>>>>>>> 43ab02d7fb61642bfb9b8c473a6d83541e39aa23


export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.(md|mdx)`,
  contentType: 'mdx',
  fields: {
    title:        { type: 'string',   required: true },
    date:         { type: 'date',     required: true },
    description:  { type: 'string',   required: false},
<<<<<<< HEAD
    excerpt:      { type: 'string',   required: false}
  },  
  computedFields: {
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
=======
    excerpt:      { type: 'string',   required: false},
>>>>>>> 43ab02d7fb61642bfb9b8c473a6d83541e39aa23
  },
}))


export default makeSource({
    contentDirPath: '_content', 
    documentTypes: [Post],
<<<<<<< HEAD
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
=======
>>>>>>> 43ab02d7fb61642bfb9b8c473a6d83541e39aa23
})