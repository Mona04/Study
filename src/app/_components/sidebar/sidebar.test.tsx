import {render, fireEvent, waitFor } from '@testing-library/react'

import {ContextProvider, Context} from "@/context/context"
import SideBar from './sidebar'
import MastHead from "@/components/nav/masthead"

describe('Categgory Test', () => {
  it('Categgory Show Test', async () => {

    const screen = render(
    <ContextProvider>
      <MastHead/>
      <SideBar/>
    </ContextProvider>);

    const togglebtn = screen.getByRole('button', {name: /toggle menu/i});
    fireEvent.click(togglebtn);

    const homeurl = await waitFor(()=>screen.getByText(/Home/i, {}));

    expect(homeurl).toBeDefined();
  })
})