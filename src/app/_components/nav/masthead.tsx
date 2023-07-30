import {BLOG_NAME} from "configs/blog-config"
import MenuButton from './menu-buttun'
import style from "./masthead.module.scss"


function MastHead() {

  return (
    <nav>
      <div className={style.masthead}>
        <MenuButton/>
        <a className={style['site-title']}>{BLOG_NAME}</a>    
      </div>
    </nav>
  );
}

export default MastHead;