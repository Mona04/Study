import Link from "nextwrap/link"

import MenuButton from './menu-button'
import SearchButton from './search-button'
import DarkModeToggle from "./darkmode-toggle"

import style from "./masthead.module.scss"

import BLOG_CONFIGS from "@/configs/blog-config.json"


function MastHead() {

  return (
    <nav className={style.masthead}>
      <MenuButton/>
      <Link className="tw-self-center tw-ml-1
                       tw-font-sans tw-font-bold tw-text-color-primary tw-text-xl
                       hover:tw-text-color-text"
            href="/">
        {BLOG_CONFIGS.BLOG_NAME}
      </Link>
      <div className="tw-grow"></div>
      <SearchButton className="tw-flex tw-self-center tw-text-xl"/>
      <DarkModeToggle className='tw-flex tw-self-center tw-ml-2 tw-mr-4 tw-text-xl '/>
    </nav>
  );
}

export default MastHead;