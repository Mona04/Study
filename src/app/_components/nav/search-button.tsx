'use client'

import {useContext, useState} from "react"
import {Context} from '@/context/context'

import {AiOutlineSearch} from 'react-icons/ai'


function SearchButton({className}: {className?: string|undefined}) {
  const context = useContext(Context);
  const [bOpen, setOpen] = useState(false);
  
  context?.statemgr.registSearchEvent(v=>setOpen(v));

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