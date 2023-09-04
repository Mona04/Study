import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { readFileSync } from 'fs'
import { visit } from 'unist-util-visit'
import prettyCode from 'rehype-pretty-code'
import rm_math from 'remark-math'
import mathjax from 'rehype-mathjax'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.(md|mdx)`,
  contentType: 'mdx',
  fields: {
    title:        { required: true,  type: 'string',  },
    date:         { required: true,  type: 'date',     },
    description:  { required: false, type: 'string',   },
    tags:         { required: false, type: 'list', of: {type: 'string'} },
    post_type:    { required: false, type: 'string'}
  },  
  computedFields: {
    url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` },
  },
}))

export default makeSource({
    contentDirPath: '_content', 
    documentTypes: [Post],
    mdx:{ 
      remarkPlugins: [ [rm_math,]],
      rehypePlugins: [             
        [ preprocess ],        
        [ mathjax,],
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
            //onVisitTitle: onVisitTitle,
          }
        ],
        [ postprocess]
      ]    
    },
    markdown:{ rehypePlugins: [prettyCode] }
})

/**
   Unified transformer to save original code.
 * @returns 
 */
function preprocess() {
  return  async (tree : any)  => {
    visit(tree, 'element', (node) => {
      if(node?.tagName === 'pre'){
        const [codeEl] = node.children;  
        if (codeEl.tagName === "code"){
          node.raw = codeEl.children?.[0].value;
        }  
      }
    })
  }
}

/**
 * Unified transformer to make a title bar.
 * @returns 
 */
function postprocess() {
  return  async (tree : any)  => {
    visit(tree, 'element', (node, index, parent) => {
      if(node?.tagName === 'pre'){
        const lang = node.properties['data-language'];
        const code = parent.raw;
        const [header, pre] = parent.children;
        if(header == node){
          const theme = node.properties['data-theme'];
          parent.children.unshift(
            {
              type: 'element',
              tagName: 'titlebar',
              properties: {
                'data-rehype-pretty-code-title': '', 
                'data-language': lang,
                'data-theme': theme,
                'code': code
              },
              children: [{ type: 'text', value: lang }]
            }
          )
        }
        else{
          header.tagName = 'titlebar';
          header.properties['code'] = code;
        }
      }
    })
  }
}