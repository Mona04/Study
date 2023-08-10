import Link from "nextwrap/link"

import SideBarInteract from './sidebar-interact'
import SideBarCategory from './sidebar-categories'
import DarkModeToggle from "../darkmode-toggle/darkmode-toggle"
import style from "./sidebar.module.scss"


function SideBar() {
  return (
    <aside>
      <SideBarInteract>  
        <div className={style.sidebar} >
          <DarkModeToggle/>
          <div>
            <Link href="/">
              {"Home Page"}
            </Link>
          </div>     
          <SideBarCategory/>
        </div>
      </SideBarInteract>  
    </aside>
  );
}

export default SideBar;