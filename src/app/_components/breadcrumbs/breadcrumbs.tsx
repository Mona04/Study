import Link from "nextwrap/link"

export default function BreadCrumbs({path, className}: {path:string, className?:string}) {
  let directory = '/';

  if(path.length > 0 && path[0] == '/'){
    path = path.slice(1);
  }

  const links = path.split('/').map(category=>{
    directory += category + '/';
    return (
      <div key={directory} className="tw-flex tw-flex-row tw-text-sm">
        <Link href={directory}>
          {category}
        </Link>
        <div>/</div>
      </div>
    )
  });

  return (
    <div className={"tw-flex tw-flex-row tw-font-sm" + className}>
      {
        <>
          <span className="tw-mr-1 material-symbols-outlined">
            folder_open
          </span>
          <Link className="tw-text-sm" href="/">Home</Link>
          <div className="tw-text-sm">/</div>
        </>
      }
      {
        links
      }
    </div>
  )
}