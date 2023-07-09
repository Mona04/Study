const darkModeAttribute : string = "data-theme";

export function isBrowser() : boolean { return typeof window !== "undefined"}
export function isBroswerPreferDarkMode() : boolean {
    if(!isBrowser()) return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function isDarkMode() : boolean {
    if(!isBrowser()) return false;
    return document.documentElement.getAttribute(darkModeAttribute) === 'dark'
}
export function setDarkMode() : void { 
    if(!isBrowser()) return;
    document.documentElement.setAttribute(darkModeAttribute, 'dark'); 
}
export function setLightMode() : void { 
    if(!isBrowser()) return;
    document.documentElement.setAttribute(darkModeAttribute, 'light') 
}
export function toggleDarkMode() : void { isDarkMode() ? setLightMode() : setDarkMode();}