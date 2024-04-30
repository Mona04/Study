import {defineDocumentType} from "archivelayer"
import { readFileSync } from 'fs'
import { visit } from 'unist-util-visit'

import rm_gfm      from 'remark-gfm'
import rm_math     from 'remark-math'
import rh_raw      from 'rehype-raw'
import rh_prettyCode  from 'rehype-pretty-code'
import rh_mathjax     from 'rehype-mathjax'
import rh_katex       from 'rehype-katex'

export const BlogMDPost = defineDocumentType(() => ({
  name: 'BlogMDPost',
  filePathPattern: `**/*.md`,
  contentType: 'markdown',
  fields: blogFields(),  
  computedFields: blogComputedFields(),
}))

export const BlogMDXPost = defineDocumentType(() => ({
  name: 'BlogMDXPost',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: blogFields(),
  computedFields: blogComputedFields(),
}))

/**
 * @type {import('archivelayer').ArchiveLayerConfigs}
 **/
const configs = {
  sourcePath: './_content/',
  outputPath: './packages/',
  documentTypes: [BlogMDPost, BlogMDXPost],
  mdx:{ 
    remarkPlugins: [ rm_gfm, [rm_math,]],
    rehypePlugins: [
      modifyInput, attachHeaderID, saveRawCode,
      [ rh_prettyCode, prettyCodeOptions() ],
      [ rh_katex ],
      addCodeTitleBar,
    ]
  },
  markdown:{ 
    remarkPlugins: [ rm_gfm, [rm_math,] ],
    rehypePlugins: [
      modifyInput, attachHeaderID,
      [ rh_raw ], saveRawCode,
      [ rh_prettyCode, prettyCodeOptions() ],
      [ rh_mathjax, mathjaxOptions()],
      addCodeTitleBar,
    ]
  },
}

/**
 * @returns {import('archivelayer').FieldDefs}
 **/
function blogFields() {
  return {
    title:        { required: true,  type: 'string',  },
    date:         { required: true, type: 'date',     },
    description:  { required: true, type: 'string',   },
    tags:         { required: true, type: 'list', of: {type: 'string'} },
    thumbnail:    { required: false, type: 'string'},
    useSearch:    { required: false, type: 'boolean', default: true},
  }
}

/**
 * @returns {import('archivelayer').ComputedFieldDefs}
 **/
function blogComputedFields() {
  return {
  url: { type: 'string', resolve: (post) => `/posts/${post._raw.flattenedPath}` }
}}

/**
 * // https://rehype-pretty-code.netlify.app/    
 * @returns 
 */
function prettyCodeOptions()
{
  return  {
    grid: true,
    showLineNumbers: true,
    keepBackground: true,
    //theme: {
    //  dark: 'github-dark',//'rose-pine-moon',
    //},
    theme: JSON.parse(
      readFileSync(new URL('./pretty-code-theme.json', import.meta.url), 'utf-8')
    ),
    //onVisitTitle: onVisitTitle,
  };
}

/**
 * https://docs.mathjax.org/en/latest/options/output/svg.html
 * @returns 
 */
function mathjaxOptions()
{
  return {
    svg: {
      scale: 1,                      // global scaling factor for all expressions
      minScale: .5,                  // smallest scaling factor to use
      mtextInheritFont: false,       // true to make mtext elements use surrounding font
      merrorInheritFont: true,       // true to make merror text use surrounding font
      mathmlSpacing: false,          // true for MathML spacing rules, false for TeX rules
      skipAttributes: {},            // RFDa and other attributes NOT to copy to the output
      exFactor: .5,                  // default size of ex in em units
      displayAlign: 'center',        // default for indentalign when set to 'auto'
      displayIndent: '0',            // default for indentshift when set to 'auto'
      fontCache: 'local',            // or 'global' or 'none'
      localID: null,                 // ID to use for local font cache (for single equation processing)
      internalSpeechTitles: true,    // insert <title> tags with speech content
      titleID: 0                     // initial id number to use for aria-labeledby titles
    }
  };
}

/**
   TOC 용 ID 만들기.
 * @returns 
 */
function attachHeaderID() {
  return  async (tree , ...prop)  => {

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
      let cur = node.children[0];
      let id = null;

      switch(cur.type)
      {
        case 'text':
          id = cur.value.replaceAll(' ', '-');
          break;
        case 'element':
          if(cur.tagName === 'a')
            id = cur.children[0].value.replaceAll(' ', '-');
          break;
        default:
      }

      if(id != null)
      {
        node.properties.id = id;
      }
      else
      {
        console.warn(`Cannot Attach ID to html Header\n${cur}`)    
      }
    });
  }
}

/**
   Copy 버튼 용 rawcode 저장.
 * @returns 
 */
function saveRawCode() {
  return  async (tree, ...prop)  => {
    
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
   Input 은 Label 안붙으면 경고 떠서 딴거로 바꿈.
 * @returns 
 */
function modifyInput() {
  return  async (tree, ...prop)  => 
  {
    // save the original code because it will be parsed for styling. 
    visit(tree, 'element', (node) => {
      if(node == null || node.tagName != 'input') return;

      if(node.properties.type === 'checkbox'){
        const isChecked  = node.properties.checked;
        const isDisabled = node.properties.disabled;
        node.tagName = 'div';
        node.properties['data-checkbox'] = "";
      }
    });
  }
}

/**
 * Unified transformer
 * @returns 
 */
function addCodeTitleBar() {
  return  async (tree)  => {

    // create a title bar for a Markdown code block.
    visit(tree, 'element', (node, index, parent) => {
      if(node?.tagName !== 'pre') return;
     
      // div.children = { header, pre } 거나 { pre } 임
      const [header, pre] = parent.children;

      // title 이 생성된 경우
      if(header != node){
        const code = parent.raw;
        header.tagName = 'div';
        // code 종류 안적으면 properties 가 없음.
        if(header.properties==null) header.properties={}
        header.properties['data-code'] = code;
        addCopyButton(header);
      }
      // title 이 생성되지 않은 경우
      else{   
        const lang = node.properties['data-language'];
        const theme = node.properties['data-theme'];
        // unshift 된건 다시 위의 코드로 들어오게 됨.
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
      }
    })
  }
}

function addCopyButton(parent)
{
  parent.children.push(
    {
      type: 'element',
      tagName: 'button',
      properties: 
      {
        // 다음의 문제 때문.
        // Warning: Buttons must have discernible text: Element has no title attribute
        'title': 'code-copy-btn' 
      },
    }
  )
}

export default configs;