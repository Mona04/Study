const darkModeAttribute : string = "data-theme";

export function isBrowser() : boolean { return typeof window !== "undefined"}
export function isBroswerPreferDarkMode() : boolean {
    if(!isBrowser()) return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function saveDarkModeFromLocal() : void { 
  window.localStorage.setItem("theme", isDarkMode() ? "dark" : 'light');
}
export function isDarkMode() : boolean {
  if(!isBrowser()) return false;
  return document.documentElement.getAttribute(darkModeAttribute) === 'dark';
}
export function setDarkMode() : void { 
  if(!isBrowser()) return;
  document.documentElement.setAttribute(darkModeAttribute, 'dark'); 
  //document.documentElement.classList.remove("dark");
  saveDarkModeFromLocal();
}
export function setLightMode() : void { 
  if(!isBrowser()) return;
  document.documentElement.setAttribute(darkModeAttribute, 'light') 
  //document.documentElement.classList.remove('dark');
  saveDarkModeFromLocal();
}
export function toggleDarkMode() : void { isDarkMode() ? setLightMode() : setDarkMode();}

/**
 * script 에 string 으로 넣을 용도라서 풀어서 적었다.
 */
function setInitialColorMode() {
  /**
   * 만약 localStorage 가 유효하지 않다면 => media 설정으로 처리
   * 만약 localStorage 가 유효하다면 => local Storage 로 처리
   */
  if((localStorage.getItem("theme") == null && window.matchMedia("(prefers-color-scheme: dark)").matches) ||
     (localStorage.getItem("theme") == 'dark')){
      document.documentElement.setAttribute("data-theme", "dark");
  } 
}

/**
 * mode 자동으로 감지해서 바꾸는 script string
 * 주석도 들어가서 주석은 replace() 로 제거했다.
 */
export const SetInitialColorMode = `(function() {
    ${setInitialColorMode.toString().replace(/(\/\*)[^(\*\/)]*(\*\/)/g,'')}
    setInitialColorMode();
  })()
`;