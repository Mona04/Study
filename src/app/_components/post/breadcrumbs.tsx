import Link from "nextwrap/link"

export default function BreadCrumbs(
  {path, isDirectory, className}:
  {path:string, isDirectory:boolean, className?:string}) 
{
  let directory = '/';

  if(path.length > 0 && path[0] == '/'){
    path = path.slice(1);
  }

  const links = path.split('/').map(category=>{
    directory += category + '/';
    return (
      <div key={directory} className="tw-flex tw-flex-row tw-text-sm">
        <div>/</div>
        <Link href={directory}>
          {category}
        </Link>
      </div>
    )
  });

  return (
    <nav className={"tw-flex tw-flex-row tw-text-sm" + className}>
      {
        <>
          <span className="material-symbols-outlined md-base tw-self-center tw-w-5">
            folder_open
          </span>
          <Link className="tw-text-sm" href="/">Home</Link>
        </>
      }
      {
        links
      }
      {
        isDirectory ?? <div className="tw-text-sm">/</div>
      }
    </nav>
  )
}