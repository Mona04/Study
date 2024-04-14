'use client'
import {useContext, useState, useEffect} from "react"
import {Context} from '@/context/context'
import style from "./masthead.module.scss"

function MenuButton() {
  const context = useContext(Context);
  const [bOpen, setOpen] = useState(false);
  const [bAnim, setAnim] = useState(false);

  useEffect(()=>{
    const disposables : (IDisposable|undefined)[] = [];

    // 버튼 이벤트랑 연결
    disposables.push(context?.statemgr.registMenuEvent(v=>{
      if(v == bOpen) return;
      setAnim(true);
      setTimeout(()=>{
        setOpen(v);
        setAnim(false)
      }, 150);  
    }));  

    return ()=>{
      disposables.map(v=>v?.dispose());
    }
  }, [bAnim, bOpen]);

  const onClickMenu = (event:  React.MouseEvent<HTMLElement>) => {
    bOpen ? context?.statemgr.closeMenu() : context?.statemgr.openMenu();
  };
  
  return (
    <button className={[style['menu-btn'], bOpen ? style.change : '', bAnim ? style.animate:''].join(' ')} 
         title="toggle menu" id='menu-toggle-btn' type='button'
         onClick={onClickMenu}>
      <div className={style["menu-lines"]}>
        <div className={[style['line'], style['line1']].join(' ')}></div>
        <div className={[style['line'], style['line2']].join(' ')}></div>
        <div className={[style['line'], style['line3']].join(' ')}></div>
      </div>
    </button>
  )
}

export default MenuButton;