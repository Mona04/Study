import Link from "nextwrap/link"

import Interact from './sidebar-interact'
import SideBarCategory from './sidebar-categories'
import DarkModeToggle from "../darkmode-toggle/darkmode-toggle"
import style from "./sidebar.module.scss"


export default function SideBar() {
  return (
    <aside>
      <Interact>  
        <div className={style.sidebar} >
          <DarkModeToggle/>
          <div>
            <Link href="/">
              {"Home Page"}
            </Link>
          </div>     
          <SideBarCategory/>
        </div>
      </Interact>  
    </aside>
  );
}