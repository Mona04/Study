import {Event, EventDisposer} from 'utils/event'

class StateManager {
  private mMenuOpenEvent = new Event<boolean>();
  private mSearchOpenEvent = new Event<boolean>();

  constructor()
  {
  }

  public openMenu() : void {
    this.mMenuOpenEvent.invoke(true);
    this.mSearchOpenEvent.invoke(false);
  }
  public closeMenu() : void {
    this.mMenuOpenEvent.invoke(false);
  }
  public registMenuEvent(func : (bOpen:boolean) => void) : EventDisposer<boolean>
  {
    return this.mMenuOpenEvent.subscribe(func);
  }

  public openSearch() : void {
    this.mMenuOpenEvent.invoke(false);
    this.mSearchOpenEvent.invoke(true);
  }
  public closeSearch() : void {
    this.mSearchOpenEvent.invoke(false);
  }
  public registSearchEvent(func : (bOpen:boolean) => void) : EventDisposer<boolean>
  {
    return this.mSearchOpenEvent.subscribe(func);
  }
}


export default StateManager;