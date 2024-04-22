import {Event, EventDisposer} from 'utils/event'
import {setDarkMode, setLightMode, isDarkMode} from "utils/darkmode-helper"

class StateManager {
  private mMenuOpenEvent = new Event<boolean>();
  private mSearchOpenEvent = new Event<boolean>();
  private isMenuOpened = false;
  private isSearchOpened = false;
  
  private mDarkModeEvent = new Event<boolean>();
  private isDarkMode = isDarkMode();

  constructor()
  {
  }

  public IsPopupOpened() { return this.isMenuOpened || this.isSearchOpened;}

  public closeAll() : void {
    this.closeMenu();
    this.closeSearch();
  }
  
  public openMenu() : void 
  {
    this.closeSearch();
    this.isMenuOpened = true;
    this.mMenuOpenEvent.invoke(true);
  }
  public closeMenu() : void 
  {
    this.isMenuOpened = false;
    this.mMenuOpenEvent.invoke(false);
  }
  public registMenuEvent(func : (bOpen:boolean) => void) : EventDisposer<boolean>
  {
    return this.mMenuOpenEvent.subscribe(func);
  }

  public openSearch() : void 
  {
    this.closeMenu();
    this.isSearchOpened = true;
    this.mSearchOpenEvent.invoke(true);
  }
  public closeSearch() : void 
  {
    this.isSearchOpened = false;
    this.mSearchOpenEvent.invoke(false);
  }
  public registSearchEvent(func : (bOpen:boolean) => void) : EventDisposer<boolean>
  {
    return this.mSearchOpenEvent.subscribe(func);
  }

  public IsDarkMode() { return this.isDarkMode; }
  public setDarkMode(isDark:boolean) : void 
  {
    this.isDarkMode = isDark;
    this.isDarkMode ? setDarkMode() : setLightMode();
    this.mDarkModeEvent.invoke(isDark);
  }
  public registerDarkModeEvent(func : (bOpen:boolean) => void) : EventDisposer<boolean>
  {
    return this.mDarkModeEvent.subscribe(func);
  }
}


export default StateManager;