'use client'
import StateMgr from "./state-manager"
import {createContext} from 'react'

class GlobalContext {
  statemgr : StateMgr;
  constructor()
  {

    this.statemgr = new StateMgr();
  }
}

export const Context = createContext<GlobalContext | null>(null);

export function ContextProvider({ children }: {children: React.ReactNode}) {
  return <Context.Provider value={new GlobalContext()}>{children}</Context.Provider>
}