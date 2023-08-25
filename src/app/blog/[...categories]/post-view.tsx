
import { useMDXComponent } from 'next-contentlayer/hooks';

export default function PostView({title, code, raw}: {title:string, code: string, raw: string}) {
  const MDXComponent = useMDXComponent(code || '');
  return (
    <main>
      <h1 className="text-3xl font-bold">{title}</h1>
      <MDXComponent components={{}}/>
    </main>
  )
}
/**
 * for markdown
   <div dangerouslySetInnerHTML={{__html: postHtml}}/>
 */