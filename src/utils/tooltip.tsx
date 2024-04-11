import { useEffect, useState } from "react";

export function ToolTip(){
  const [content, setContent] = useState<string>();
  useEffect(()=>{
    const hoverArea = document.querySelectorAll('.tooltip-hover');
    //https://stackoverflow.com/questions/66382585/tooltip-inside-a-scrollable-component
    hoverArea.forEach((o:any) => {
    // Show the tooltip
    o.addEventListener('mouseenter', () => {
      const curhover = o.querySelector('.tooltip-popup');   
      setContent(curhover == null ? o.innerHTML : curhover.innerHTML);
      tooltip.style.left = `${o.offsetLeft}px`;
      tooltip.style.top = `${o.offsetTop}px`;
      tooltip.style.animation = 'block';
      tooltip.classList.add('go')
    });
    o.addEventListener('mousemove', (e:any) => {
      tooltip.style.left = `${e.pageX+20}px`;
      tooltip.style.top = `${e.pageY-40}px`;
    });
    // Hide to tooltip
    o.addEventListener('mouseleave', () => {
      //tooltip.style.display = 'none';
      tooltip.classList.remove('go')
      setContent(undefined)
    });
  });

  });

  return <>{content}</>
}