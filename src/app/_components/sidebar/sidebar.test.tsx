import {render, fireEvent, waitFor, getByAltText} from '@testing-library/react'

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

    await new Promise((r) => setTimeout(r, 2000));
    await waitFor(()=>
    {
      expect(screen.getByText(/Home/i)).toBeDefined()
    })

    //fireEvent()
    //console.log(homeurl);
  })
})
// https://univdev.tistory.com/45
// https://loy124.tistory.com/364
// https://www.daleseo.com/react-testing-library/