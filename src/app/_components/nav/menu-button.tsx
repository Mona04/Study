'use client'
import {useContext, useState, useEffect} from "react"
import {Context} from '@/context/context'
import style from "./masthead.module.scss"

function MenuButton() {
  const context = useContext(Context);
  const [bOpen, setOpen] = useState(false);
  
  useEffect(()=>{
    const disposables : (IDisposable|undefined)[] = [];

    // 버튼 이벤트랑 연결
    disposables.push(context?.statemgr.registMenuEvent(v=>setOpen(v)));

    return ()=>{
      disposables.map(v=>v?.dispose());
    }
  });

  const onClickMenu = (event:  React.MouseEvent<HTMLElement>) => {      
    const target = event.currentTarget;
    target.classList.add(style.animate);
    // 애니메이션이 끝나고 상태를 바꿈. 상태를 바꾸면 자동으로 다시 그리게 됨.
    setTimeout(()=>{
      bOpen ? context?.statemgr.closeMenu() : context?.statemgr.openMenu();
    }, 150);  
  };

  return (
    <button className={[style['menu-btn'], bOpen ? style.change : ''].join(' ')} 
         title="toggle menu" id='menu-toggle-btn' 
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