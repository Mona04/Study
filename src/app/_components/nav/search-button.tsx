'use client'

import {useContext, useState, useEffect} from "react"
import {Context} from '@/context/context'

import {AiOutlineSearch} from 'react-icons/ai'


function SearchButton({className}: {className?: string|undefined}) {
  const context = useContext(Context);
  const [bOpen, setOpen] = useState(false);
  
  useEffect(()=>{
    const disposables : (IDisposable|undefined)[] = [];

    // 버튼 이벤트랑 연결
    disposables.push(context?.statemgr.registSearchEvent(v=>setOpen(v)));

    return ()=>{
      disposables.map(v=>v?.dispose());
    }
  }, []);

  const onClickMenu = (event:  React.MouseEvent<HTMLElement>) => {    
    bOpen ? context?.statemgr.closeSearch() : context?.statemgr.openSearch();
  };

  return (
    <button className={className} title="search button" id='search-open-btn' 
            onClick={onClickMenu}>
      <AiOutlineSearch />
    </button>
  )
}

export default SearchButton;