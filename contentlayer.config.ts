import { defineDocumentType, makeSource, FieldDefs, ComputedFields } from 'contentlayer/source-files'
import { readFileSync } from 'fs'
import { visit } from 'unist-util-visit'

import prettyCode from 'rehype-pretty-code'
import rm_gfm from 'remark-gfm'
import rm_math from 'remark-math'
import mathjax from 'rehype-mathjax'
import katex from 'rehype-katex'

export const BlogMDPost = defineDocumentType(() => ({
  name: 'BlogMDPost',
  filePathPattern: `**/*.(md)`,
  contentType: 'markdown',
  fields: blogFields(),  
  computedFields: blogComputedFields(),
}))

export const BlogMDXPost = defineDocumentType(() => ({
  name: 'BlogMDXPost',
  filePathPattern: `**/*.(mdx)`,
  contentType: 'mdx',
  fields: blogFields(),
  computedFields: blogComputedFields(),
}))

export default makeSource({
    contentDirPath: '_content/', 
    documentTypes: [BlogMDPost, BlogMDXPost],
    mdx:{ 
      remarkPlugins: [ rm_gfm, [rm_math,], ],
      rehypePlugins: [
        [ preprocess ],
        [ prettyCode, prettyCodeOption ],
        [ katex ],
        [ postprocess]
      ]
    },
    markdown:{ 
      remarkPlugins: [ [rm_math,] ],
      rehypePlugins: [
        [ preprocess ],
        [ prettyCode, prettyCodeOption ],
        [ mathjax,],
        [ postprocess]
      ]
    },
})

function blogFields() : FieldDefs {
  return {
    title:        { required: true,  type: 'string',  },
    date:         { required: true,  type: 'date',     },
    description:  { required: false, type: 'string',   },
    tags:         { required: false, type: 'list', of: {type: 'string'} },
    post_type:    { required: false, type: 'string'}
  }
}

function blogComputedFields() : ComputedFields {
  return {
  url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` }
}}

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
   Unified transformer 
 * @returns 
 */
function preprocess() {
  return  async (tree : any, ...prop: any)  => {
    
    // save the original code because it will be parsed for styling. 
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
 * Unified transformer
 * @returns 
 */
function postprocess() {
  return  async (tree : any)  => {

    // create a title bar for a Markdown code block.
    visit(tree, 'element', (node, index, parent) => {
      if(node?.tagName !== 'pre') return;
      
      const lang = node.properties['data-language'];
      const code = parent.raw;
      // div.children = { header, pre } 거나 { pre } 임
      const [header, pre] = parent.children;

      // title 이 생성된 경우
      if(header != node){
        header.tagName = 'div';
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