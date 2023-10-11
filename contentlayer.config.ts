import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import { readFileSync } from 'fs'
import { visit } from 'unist-util-visit'
import prettyCode from 'rehype-pretty-code'
import rm_math from 'remark-math'
import mathjax from 'rehype-mathjax'
import katex from 'rehype-katex'

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
    contentDirPath: '_content/', 
    documentTypes: [Post],
    mdx:{ 
      remarkPlugins: [ [rm_math,]],
      rehypePlugins: [
        [ preprocess ],                    
        [ prettyCode, prettyCodeOption ],
        //[ mathjax,],
        //[ katex ],
        [ postprocess]
      ]
    },
    markdown:{ 
      remarkPlugins: [ [rm_math,]],
      rehypePlugins: [ katex, prettyCode] 
    }
})

/**
 * // https://rehype-pretty-code.netlify.app/    
 * @returns 
 */
function prettyCodeOption()
{
  return  {
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
  };
}

/**
   Unified transformer to save original code.
 * @returns 
 */
function preprocess() {
  return  async (tree : any, ...prop: any)  => {
    visit(tree, 'mdxjsEsm', (node) => {
      //console.log(node.data.estree.body.declaration);
    })

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
      if(node?.tagName !== 'pre') return;
      
      const lang = node.properties['data-language'];
      const code = parent.raw;
      // div.children = { header, pre } 거나 { pre } 임
      const [header, pre] = parent.children;

      // title 이 생성된 경우
      if(header != node){
        //header.tagName = 'div';
        header.properties['data-code'] = code;
        addCopyButton(header);
      }
      // title 이 생성되지 않은 경우
      else{
        const theme = node.properties['data-theme'];
        parent.children.unshift(
          {
            type: 'element',
            tagName: 'div',            
            properties: {
              'data-rehype-pretty-code-title': '', 
              'data-language': lang,
              'data-theme': theme,
              'data-code': code,
            },
            children: [{ type: 'text', value: lang }]
          });
        addCopyButton(parent.children[1]);
      }
    })
  }
}

function addCopyButton(parent:any)
{
  parent.children.push(
    {
      type: 'element',
      tagName: 'button',
    }
  )
}