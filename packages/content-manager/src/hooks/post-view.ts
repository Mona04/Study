import { useMDXComponent } from 'archivelayer/hooks';
import { createElement } from 'react';

export function MDXPostView({content}: {content:string}) 
{ 
  return useMDXComponent({code:content}, {});
}

export function MDPostView({content}: {content:string}) 
{
  return createElement("div", {dangerouslySetInnerHTML:{__html:content}})
}
