import CategoryItem from "./sidebar-category-item"

import Interact from './sidebar-interact'
import SideBarCategorys from './sidebar-categories'
import style from "./sidebar.module.scss"


export default function SideBar() {

  return (
    <aside>
      <Interact>  
        <div className={style.sidebar} >
          <CategoryItem slug="/" label="HOME" refCount={-1} depth={0}/>
          <CategoryItem slug="/portfolio" label="PORTFOLIO★" refCount={-1} depth={0}/>
          <CategoryItem slug="/tags" label="TAGS" refCount={-1} depth={0}/>
          <SideBarCategorys/>
        </div>
      </Interact>  
    </aside>
  );
}