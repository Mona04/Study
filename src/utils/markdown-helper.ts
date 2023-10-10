/**
 * script 에 string 으로 넣을 용도라서 풀어서 적었다.
 * https://stackoverflow.com/questions/44661707/addeventlistener-vs-onclick
 */
function copyButtonScript() {
  if(!document) return;
  
  const titlebars = document.getElementsByTagName("titlebar");
  for (const titlebar of titlebars)
  {
    //const btn = document.createElement("button");
    //const icon = document.createElement("span");
    //icon.className =  "material-symbols-outlined";
    //icon.appendChild(document.createTextNode("asdfasfd"));
    //btn.appendChild(icon);
    //titlebar.appendChild(btn);
  }
}
  
  /**
   * 본문에서 titlebar class 를 찾아서 copybutton 을 추가해주는 스크립트
   *   <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/>
   */
export const CopyButtonScript = `
  (function() {
    ${copyButtonScript.toString().replace(/(\/\*)[^(\*\/)]*(\*\/)/g,'')}
    copyButtonScript();
  })()
`;