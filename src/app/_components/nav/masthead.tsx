import {BLOG_NAME} from "configs/blog-config"
import Link from "nextwrap/link"
import MenuButton from './menu-button'
import SearchButton from './search-button'
import style from "./masthead.module.scss"


function MastHead() {

  return (
    <nav>
      <div className={style.masthead}>
        <MenuButton/>
        <Link className="tw-align-middle tw-self-center tw-mr-auto tw-font-sans tw-font-bold hover:tw-text-color-text" 
              href="/">{BLOG_NAME}</Link>  
        <SearchButton className="tw-flex tw-self-center tw-ml-auto tw-text-2xl tw-m-3"/>
      </div>
    </nav>
  );
}

export default MastHead;