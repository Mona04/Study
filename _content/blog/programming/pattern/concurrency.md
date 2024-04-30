---
title: 동시성 모델
description: 동시성 모델
date: 2024-04-29
tags: [design pattern, concurrency]
---

## 팁들

### Memory Model

Memory Model 이 환경마다 다르므로 주의할 필요가 있다.

예를 들어 c 환경에서 힙 메모리 변경하면 모든 스레드에 적용이 된다. 하지만 [Java Memory Model](https://docs.oracle.com/javase/specs/jls/se8/html/jls-17.html) 에서는 ```volatile``` 키워드를 쓰는 등의 방법을 쓰지 않으면 보장이 되지 않는다. 다시말해 read 에도 스레드 동기화가 필요하다는 말이다. 또한 Constructor 가 호출되기 전에 외부스레드가 인스턴스에 접근할 수도 있어서 주의해야한다.[^so1]

### Dead Lock

#### lock Order

철학자의 식탁의 문제를 푸는 경우처럼 lock 대상에 순서를 부여하여 데드락을 막을 수 있다.

#### 외부 함수를 호출하는 경우

내부에서 lock 을 걸지말고 필요하면 복사해서 사용하는게 좋다.
왜냐하면 외부함수가 무엇인지 알 수 없어서 데드락의 위험이 있고, lock 거는 시간도 줄어들어 스레드를 효율적으로 쓸 수 있기 때문이다.


## Patterns

### [Double Checked Pattern](https://en.wikipedia.org/wiki/Double-checked_locking)

잘못쓰면 잡기 힘든 오류를 만들어내는 안티패턴이다. 대개 싱글톤이니 직접 구현하기 보단 안전하다고 판명된 코드를 쓰는게 좋다.




## 참고자료

[7가지 동시성 모델, 폴 부처](https://m.hanbit.co.kr/store/books/book_view.html?p_code=B3745244799)

[^so1]:[java constructor and thread safety, so](https://stackoverflow.com/questions/61803042/java-constructors-and-thread-safety)