'use client'

import {useState, useEffect, useContext} from 'react'
import { Context } from '@/context/context'
import style from "./darkmode-toggle.module.scss"

//https://alvarotrigo.com/blog/toggle-switch-css/
//https://gwan-woo-jeong.github.io/blog/change-theme/
//https://typescript-kr.github.io/pages/classes.html
function DarkModeToggle({className}: {className?: string|undefined})
{
  const [isDarkMode, setDarkMode] = useState<boolean>(false);

  const context= useContext(Context);

  useEffect(()=> {
    const disposables : (IDisposable|undefined)[] = [];

    disposables.push(context?.statemgr.registerDarkModeEvent(v=>setDarkMode(v)));
    context?.statemgr.setDarkMode(context?.statemgr.IsDarkMode());

    return ()=>{
      disposables.map(v=>v?.dispose());
    }
  }, [])

  const onChange = (e: React.InputHTMLAttributes<HTMLInputElement>) : void =>
  {   
    context?.statemgr.setDarkMode(context?.statemgr.IsDarkMode() ? false : true);
  };

  return (
    <div className={[style.toggleBtn, className].join(' ')} >
      <input id='darkmode-btn' name='darkmode-btn' type='checkbox'           
             onChange={onChange} checked={isDarkMode}/>
      <label htmlFor="darkmode-btn">Toggle</label>         
    </div>
  );
}

export default DarkModeToggle;