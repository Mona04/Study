
export default function PostView({title, postHtml}: {title:string, postHtml: string}) {
  return (
    <main>
      <h1 className="text-3xl font-bold">{title}</h1>
      <div dangerouslySetInnerHTML={{__html: postHtml}}></div>
      <div>My Slugs: {Date.now()}</div>
    </main>
  )
}