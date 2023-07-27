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
    return document.documentElement.getAttribute(darkModeAttribute) === 'dark' ||  window.matchMedia("(prefers-color-scheme: dark)").matches;
}
export function setDarkMode() : void { 
    if(!isBrowser()) return;
    document.documentElement.setAttribute(darkModeAttribute, 'dark'); 
    saveDarkModeFromLocal();
}
export function setLightMode() : void { 
    if(!isBrowser()) return;
    document.documentElement.setAttribute(darkModeAttribute, 'light') 
    saveDarkModeFromLocal();
}
export function toggleDarkMode() : void { isDarkMode() ? setLightMode() : setDarkMode();}


function setInitialColorMode() {
  if(localStorage.getItem("theme") === "dark" ||  window.matchMedia("(prefers-color-scheme: dark)").matches)
  {
    document.documentElement.setAttribute("data-theme", "dark");
  }  
}
export const SetInitialColorMode = `(function() {
    ${setInitialColorMode.toString()}
    setInitialColorMode();
  })()
`;