'use client'

import style from './page.module.scss'

export default function PostView() {
  return (
    <>
      <p>{"dpr:"}{window?.devicePixelRatio}</p>
      <p>{"viewportx"}{window?.innerWidth}</p>
      <p>{"viewporty"}{window?.innerHeight}</p>
      <div className={style.test}></div>
    </>
  )
}