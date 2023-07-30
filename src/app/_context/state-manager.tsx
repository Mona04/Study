import {Event, EventDisposer} from 'utils/event'

class StateManager {
  
  bMenuOpened : boolean;
  private mMenuOpenEvent = new Event<boolean>();

  constructor()
  {
      this.bMenuOpened = false;

  }

  public openMenu() : void {
    this.mMenuOpenEvent.invoke(true);
  }
  public closeMenu() : void {
    this.mMenuOpenEvent.invoke(false);
  }
  public toggleMenu() : void {
    this.bMenuOpened = !this.bMenuOpened;
    this.mMenuOpenEvent.invoke(this.bMenuOpened);
  }
  public registMenuEvent(func : (bOpen:boolean) => void) : EventDisposer<boolean>
  {
    return this.mMenuOpenEvent.subscribe(func);
  }
}


export default StateManager;