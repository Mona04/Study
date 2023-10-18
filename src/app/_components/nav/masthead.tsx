import Link from "nextwrap/link"

import MenuButton from './menu-button'
import SearchButton from './search-button'
import DarkModeToggle from "../darkmode-toggle/darkmode-toggle"

import style from "./masthead.module.scss"

import {BLOG_NAME} from "configs/blog-config"


function MastHead() {

  return (
    <nav>
      <div className={style.masthead}>
        <MenuButton/>
        <Link className="tw-align-middle tw-self-center tw-mr-auto 
                         tw-font-sans tw-font-bold tw-text-color-primary tw-text-xl
                         hover:tw-text-color-text "
              href="/">{BLOG_NAME}</Link>  
        <div className="tw-ml-auto"/>
        <SearchButton className="tw-flex tw-self-center tw-text-2xl"/>
        <DarkModeToggle className='tw-flex tw-self-center tw-text-1xl '/>
        <div className="tw-mr-1"/>
      </div>
    </nav>
  );
}

export default MastHead;