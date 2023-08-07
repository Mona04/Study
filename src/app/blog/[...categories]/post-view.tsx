

export default function PostView({title, postHtml}: {title:string, postHtml: string, raw: string}) {

  return (
    <main>
      <h1 className="text-3xl font-bold">{title}</h1>
        <div dangerouslySetInnerHTML={{__html: postHtml}}/>
      <div>My Slugs: {Date.now()}</div>
    </main>
  )
}