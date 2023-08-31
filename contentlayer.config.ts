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
            onVisitTitle: onVisitTitle
          }
        ]
      ]    
    },
    markdown:{ rehypePlugins: [prettyCode] }
})

function onVisitTitle(element: any) 
{
  if(element.children.length > 0){
    const title = element.children[0];
    element.children[0] = {
      type: 'element',
      tagName: 'title',
      children: [title]
    }
  }

  element.children.push({
    type: 'element',
    tagName: 'copy',
    properties: { className: ['copy'] },
    children: [{ type: 'text', value: 'Copy' }]
  });
}