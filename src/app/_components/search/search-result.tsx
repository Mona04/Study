
function SearchItem({item}:{item:string}){
  return (
    <>{item}</>
  )
}

function SearchContent({items}:{items:string[]|null}){
  if(items == null) return <></>
  return items.map((r,i)=><SearchItem key={i} item={r}/>);
}

function SearchContainer({children,}: {children: React.ReactNode}){
  return (
    <div className="tw-w-10">
      {children}
    </div>
  )
}

export default function SearchResults({items}:{items:string[]|null}) {
  return (
    <section>
      <SearchContainer>
        <SearchContent items={items}/>
      </SearchContainer> 
    </section>
  );
}  