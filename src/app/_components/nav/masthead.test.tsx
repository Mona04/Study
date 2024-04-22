import {render, fireEvent, waitFor } from '@testing-library/react'

import {ContextProvider} from "@/context/context"
import MastHead from "@/components/nav/masthead"
import SideBar  from '@/components/popup/sidebar/sidebar'
import Search   from '@/components/popup//search/search'

describe('Masthead Test', () => {
  it('Sidebar Show Test', async () => {

    const screen = render(
      <ContextProvider>
        <MastHead/>
        <SideBar/>
        <Search/>
      </ContextProvider>);
    
    const searchbtn = screen.getByRole('button', {name: /search button/i});
    fireEvent.click(searchbtn);

    const togglebtn = screen.getByRole('button', {name: /menu button/i});
    fireEvent.click(togglebtn);

    // 사이드 바의 Home 텍스트 나오는지 확인
    const homeurl = await waitFor(()=>screen.getByText(/Home/i, {}));

    expect(homeurl).toBeDefined();
  })

  it('Search Show Test', async () => {

    const screen = render(
      <ContextProvider>
        <MastHead/>
        <SideBar/>
        <Search/>
      </ContextProvider>);
    
    const togglebtn = screen.getByRole('button', {name: /menu button/i});
    fireEvent.click(togglebtn);

    const searchbtn = screen.getByRole('button', {name: /search button/i});
    fireEvent.click(searchbtn);

    const noresults = await waitFor(()=>screen.getByText(/No Results/i, {}));

    expect(noresults).toBeDefined();
  })
})