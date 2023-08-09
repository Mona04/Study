import Link from "nextwrap/link"

import SideBarInteract from './sidebar-interact'
import SideBarCategory from './sidebar-categories'
import style from "./sidebar.module.scss"


function SideBar() {
  return (
    <aside>
      <SideBarInteract>  
        <div className={style.sidebar} >
          <div>
            <Link href="/">
              <p>
                {"Home Page"}
              </p>
            </Link>
          </div>     
          <SideBarCategory/>
        </div>
      </SideBarInteract>  
    </aside>
  );
}

export default SideBar;