import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { readFileSync } from 'fs'
import {visit} from 'unist-util-visit'
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
        // unified transformer to save original code
        [          
          () => async (tree)  => {
            visit(tree, 'element', (node, index, parent) => {
              if(parent?.tagName === 'div' && parent?.properties?.['data-rehype-pretty-code-fragment'] != undefined){
                const [header, pre] = node?.children;
                if(header?.tagName != 'div'){

                }
                //header.children?.map((v:any)=>{
                //  console.log(v)
                //})
              }              
      
              return;
              if(node?.children?.length > 1){
               
              }
             
              if(node?.type === 'element' && node?.tagName === 'pre'){
                const [codeEl] = node.children;
 
                if (codeEl.tagName !== "code") return;
       
                node.raw = codeEl.children?.[0].value;
              }
            })
          }
        ],        
        // https://rehype-pretty-code.netlify.app/
        [
          prettyCode,
          {
            grid: true,
            showLineNumbers: true,
            keepBackground: true,
            //theme: {
            //  dark: 'github-dark',//'rose-pine-moon',
            //},
            theme: JSON.parse(
              readFileSync(new URL('../../../src/configs/pretty-code-theme.json', import.meta.url), 'utf-8')
            ),
            onVisitTitle: onVisitTitle,
          }
        ]               
      ]    
    },
    markdown:{ rehypePlugins: [prettyCode] }
})

function onVisitTitle(element: any) 
{
  // Wrap the title with a tag
  if(element.children.length > 0){
    const title = element.children[0];
    element.children[0] = {
      type: 'element',
      tagName: 'title',
      children: [title]
    }
  }

  // Add Copy Button
  element.children.push({
    type: 'element',
    tagName: 'copy',
    properties: { className: ['copy'] },
    children: [{ type: 'text', value: 'Copy' }]
  });
}