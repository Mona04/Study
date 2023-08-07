import {Event} from "utils/event"


describe('Event Test', () => {
  it('EventDispatcher invoke Test', () => {
    const event1 : Event<boolean> = new Event<boolean>();
    // 이 값을 이벤트를 통해 바꿔서 잘 작동하는지 테스트 할 것
    let b1 : boolean = false;
    event1.subscribe(v=>{
      b1 = v;
    });
    event1.invoke(true);
    expect(b1).toBeTruthy();
    event1.invoke(false);
    expect(!b1).toBeTruthy();
  })
  it('EventDispatcher unsubscribe Test', () => {
    const event1 : Event<boolean> = new Event<boolean>();

    let b1 : boolean = false;
    const d1 = event1.subscribe(v=>{
      b1 = v;
    });
    event1.invoke(true);
    expect(b1).toBeTruthy();

    d1.dispose();

    event1.invoke(false);
    expect(b1).toBeTruthy();
  })
})