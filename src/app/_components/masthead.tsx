import style from "@/styles/components/masthead.module.scss"
import {BLOG_NAME} from "@/lib/config/blog-config"

function MastHead() {

  return (
    <div className={style.masthead}>
      <div className={style['menu']} title="menu">
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