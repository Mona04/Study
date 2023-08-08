import {render, fireEvent} from '@testing-library/react'
import SideBarCategory from './sidebar-categories'
import {allPosts} from '@/contentlayer/generated'

describe('Categgory Test', () => {
  it('Categgory Show Test', () => {
    console.log(allPosts.length)
    //const screen = render(<><SideBarCategory/></>);
    //
    //const homeurl = screen.getByText("Home");
    //console.log(homeurl);
  })
})
// https://univdev.tistory.com/45
// https://loy124.tistory.com/364
// https://www.daleseo.com/react-testing-library/