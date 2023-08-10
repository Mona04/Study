
import { useMDXComponent } from 'next-contentlayer/hooks';

export default function PostView({title, postHtml, raw}: {title:string, postHtml: string, raw: string}) {
  const MDXComponent = useMDXComponent(raw || '');
  return (
    <main>
      <h1 className="text-3xl font-bold">{title}</h1>
      <MDXComponent/>
      <div>My Slugs: {Date.now()}</div>
    </main>
  )
}
//<div dangerouslySetInnerHTML={{__html: postHtml}}/>