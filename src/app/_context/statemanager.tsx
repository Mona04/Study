import {Event, EventDisposer} from 'utils/event'

class StateManager {
  private mMenuOpenEvent = new Event<boolean>();
  private mSearchOpenEvent = new Event<boolean>();
  private mIsMenuOpened = false;
  private mIsSearchOpened = false;

  constructor()
  {
  }

  public IsPopupOpened() { return this.mIsMenuOpened || this.mIsSearchOpened;}

  public closeAll() : void {
    this.closeMenu();
    this.closeSearch();
  }
  
  public openMenu() : void 
  {
    this.closeSearch();
    this.mIsMenuOpened = true;
    this.mMenuOpenEvent.invoke(true);
  }
  public closeMenu() : void 
  {
    this.mIsMenuOpened = false;
    this.mMenuOpenEvent.invoke(false);
  }
  public registMenuEvent(func : (bOpen:boolean) => void) : EventDisposer<boolean>
  {
    return this.mMenuOpenEvent.subscribe(func);
  }

  public openSearch() : void 
  {
    this.closeMenu();
    this.mIsSearchOpened = true;
    this.mSearchOpenEvent.invoke(true);
  }
  public closeSearch() : void 
  {
    this.mIsSearchOpened = false;
    this.mSearchOpenEvent.invoke(false);
  }
  public registSearchEvent(func : (bOpen:boolean) => void) : EventDisposer<boolean>
  {
    return this.mSearchOpenEvent.subscribe(func);
  }
}


export default StateManager;