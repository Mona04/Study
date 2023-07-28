'use client'
import style from "@/styles/components/masthead.module.scss"
import {BLOG_NAME} from "@/lib/config/blog-config"

function MastHead() {
  const onClickMenu = () => {
    
    // Add your custom logic here to handle the button click event.
  };
  return (
    <div className={style.masthead}>
      <div className={style['menu-btn']} title="menu"
           onClick={onClickMenu}>
        <div className={style["menu-lines"]}>
          <div className={style["line"]}></div>
          <div className={style["line"]}></div>
          <div className={style["line"]}></div>
        </div>
      </div>
      <a className={style['site-title']}>{BLOG_NAME}</a>

    </div>
  );
}

export default MastHead;