import {render, fireEvent, waitFor, act } from '@testing-library/react'

import {CopyButtonScript} from './markdown-helper'

describe('Code Highlight Test', () => {
  it('Copy Button Test', async () => {
    // navigator mock
    Object.assign(navigator, {
      clipboard: {
        writeText : jest.fn(),
      },
    });

    const code = `
      #include <iostream>
      void main()
      {
        std::cout << "hello world" << std::endl
      }
    `;
    const props = {
      properties: {
        'data-language': 'c++',
        'data-theme': 'default'
      }
    }

    const screen = render(
      <>
        <script dangerouslySetInnerHTML={{__html: CopyButtonScript }} />
        <div>
          <div data-rehype-pretty-code-title="" data-code={code}>
            <button></button>
          </div>
        </div>
      </>
    );
    //<TitleBar code={code} properties={props}/>

    const togglebtn = screen.getByRole('button',);
    expect(togglebtn).toBeDefined();
        
    // 내부에서 async 로 state 바꿔서 not wrapped in act warning 뜨기 때문에 
    // component update 를 기다리는 waitfor 필요
    await waitFor(()=>fireEvent.click(togglebtn));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
  })
})