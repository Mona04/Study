'use client'

import {useState, useEffect} from 'react'
import * as Utils from "utils/darkmode-helper"
import style from "./darkmode-toggle.module.scss";

//https://alvarotrigo.com/blog/toggle-switch-css/
//https://gwan-woo-jeong.github.io/blog/change-theme/
//https://typescript-kr.github.io/pages/classes.html
function DarkModeToggle({className}: {className?: string|undefined})
{
  const [bDarkMode, setDarkMode] = useState<boolean>(false);

  useEffect(()=> {
    setDarkMode(Utils.isDarkMode());
  }, [])

  const onChange = (e: React.InputHTMLAttributes<HTMLInputElement>) : void =>
  {   
    Utils.toggleDarkMode();
    setDarkMode(Utils.isDarkMode());
  };

  return (
    <div className={[style.toggleBtn, className].join(' ')} >
      <input id='darkmode-btn' name='darkmode-btn' type='checkbox'           
             onChange={onChange} checked={bDarkMode}/>
      <label htmlFor="darkmode-btn">Toggle</label>         
    </div>
  );
}

export default DarkModeToggle;