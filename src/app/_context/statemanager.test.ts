import StateMgr from "./statemanager"

describe('StateManager', () => {
    it('State Manager Regist and Fire Test', () => {
      const statemgr = new StateMgr;
      let v1 = false;
      statemgr.registMenuEvent(b=>{v1 = b});
      statemgr.openMenu();
      expect(v1).toBeTruthy();
      statemgr.closeMenu();
      expect(v1).toBeFalsy();
    })
  })