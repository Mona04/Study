'use client'
import {useContext, useState} from "react"
import {Context} from '@/context/context'
import style from "./masthead.module.scss"

function MenuButton() {
  const context = useContext(Context);
  const [bOpen, setOpen] = useState(context !== undefined ? context?.statemgr.bMenuOpened : false);
  
  const onClickMenu = (event:  React.MouseEvent<HTMLElement>) => {    
    !bOpen ? context?.statemgr.openMenu() : context?.statemgr.closeMenu();
    setOpen(!bOpen);

    event.currentTarget.classList.remove(style.animate);
    const target = event.currentTarget;

    // animation 인식 안해서 딜레이로 해결
    setTimeout(() => {
      target.classList.add(style.animate);
    }, 10);
  
  };

  return (
    <div className={[style['menu-btn'], bOpen ? style.change : ''].join(' ')} title="menu"
         onClick={onClickMenu}>
      <div className={style["menu-lines"]}>
        <div className={[style['line'], style['line1']].join(' ')}></div>
        <div className={[style['line'], style['line2']].join(' ')}></div>
        <div className={[style['line'], style['line3']].join(' ')}></div>
      </div>
    </div>
  )
}

export default MenuButton;