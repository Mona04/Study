import style from "@/styles/components/masthead.module.scss"
import {BLOG_NAME} from "@/lib/config/blog-config"

function MastHead() {

  return (
    <div className={style.masthead}>
      <div className={style['masthead-menu']}>
        <a className={style['site-title']}>{BLOG_NAME}</a>
      </div>
    </div>
  );
}

export default MastHead;