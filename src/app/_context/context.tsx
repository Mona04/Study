'use client'

import StateManager from "./statemanager"
import { SearchManager } from "./searchmanager"
import {createContext} from 'react'

export * from './statemanager'
export * from './searchmanager'

class GlobalContext {
  statemgr : StateManager;
  searchmgr : SearchManager;
  constructor()
  {
    if(process != null && process.env.NODE_ENV == 'development')
    {
      console.log(`Context Created.`);
    }
    
    this.statemgr = new StateManager();
    this.searchmgr = new SearchManager();
  }
}

// 거의 준 싱글톤.
const globalContext = new GlobalContext();

export const Context = createContext<GlobalContext | null>(null);

export function ContextProvider({ children }: {children: React.ReactNode}) {
  return <Context.Provider value={globalContext}>{children}</Context.Provider>
}