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
      remarkPlugins: [ rm_gfm, [rm_math,]],
      rehypePlugins: [
        saveRawCode, makeTOC,
        [ prettyCode, prettyCodeOption ],
        [ katex ],
        [ postprocess]
      ]
    },
    markdown:{ 
      remarkPlugins: [ rm_gfm, [rm_math,] ],
      rehypePlugins: [
        saveRawCode, makeTOC,
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
function makeTOC() {
  return  async (tree : any, ...prop: any)  => {
    
    const toc : {type:string, tagName:string, properties?:object, children: any[]} = {
      type: 'element',
      tagName: 'div',
      properties: {className: 'toc'},
      children: [{type:'element', tagName:'header', children:[
        { type:'element', tagName:'h4', children:[{type:'text', value:'On This Page'}]}
      ]}]
    };
    const stack = [{node: toc, lv: -1}];

    visit(tree, 'element', (node) => {
      const lv = node?.tagName === 'h1' ? 1 
        : node?.tagName === 'h2' ? 2
        : node?.tagName === 'h3' ? 3
        : node?.tagName === 'h4' ? 4
        : node?.tagName === 'h5' ? 5
        : node?.tagName === 'h6' ? 6 : 1000;
      if(lv > 10) return;

      if(node.children.length < 1) return;     

      // add an id to headers
      const id = node.children[0].value;
      node.properties.id = id;

      // unstack until parent header appear.
      let cur = stack[stack.length-1];
      while(cur.lv >= lv) {
        stack.pop();
        cur = stack[stack.length-1];
      }

      // The first child is link or text, second is a list. 
      if(cur.node.children.length < 2 || cur.node.children[1].tagName !== 'ul'){
        cur.node.children.push({type:'element', tagName:'ul', children: []});
      }
      const newItem = {type: 'element', tagName:'li', children: [{type:'element', tagName:'a', properties:{href:`#${id}`}, children: [ {type:'text', value:id}] }]};
      cur.node.children[1].children.push(newItem);
      stack.push({node:newItem, lv:lv});
    });

    tree.children.unshift(toc)
  }
}

/**
   Unified transformer 
 * @returns 
 */
function saveRawCode() {
  return  async (tree : any, ...prop: any)  => {
    
    // save the original code because it will be parsed for styling. 
    visit(tree, 'element', (node) => {
      if(node?.tagName === 'pre'){
        const [codeEl] = node.children;

        if (codeEl.tagName === "code"){
          node.raw = codeEl.children?.[0].value;
        }  
      }
    });
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
     
      // div.children = { header, pre } 거나 { pre } 임
      const [header, pre] = parent.children;

      // title 이 생성된 경우
      if(header != node){
        const code = parent.raw;
        header.tagName = 'div';
        header.properties['data-code'] = code;
        addCopyButton(header);
      }
      // title 이 생성되지 않은 경우
      else{   
        const lang = node.properties['data-language'];
        const theme = node.properties['data-theme'];
        parent.children.unshift(
          {
            type: 'element',
            tagName: 'div',            
            properties: {
              'data-rehype-pretty-code-title': '', 
              'data-language': lang,
              'data-theme': theme,
            },
            children: [{ type: 'text', value: lang }]
          });
        // unshift 된건 다시 검색하므로 또 넣을 이유가 없음.
        //addCopyButton(parent.children[1]);
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

function addLink(parent:any, url:string, text:string)
{
  parent.children.push({type:'link', url:url, children: [{type:'text', value:text}]})
}