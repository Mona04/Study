---
title: Patterns for Concurrency Programming
description: Concurrency Programming 에서 쓰이는 패턴과 쉽게 범할 요류들 정리
date: 2024-04-29
tags: [design pattern, concurrency]
---

이 글은 Concurrency Programming 을 하면서 사용하게 되는 패턴들과 쉽게 범할 오류들을 공부하며 정리하는 글입니다.

## Memory Model

Memory Model 이 환경마다 다르므로 주의할 필요가 있다.

예를 들어 c 환경에서 힙에 있는 값을 변경하면 모든 스레드에 적용이 된다. 하지만 [Java Memory Model](https://docs.oracle.com/javase/specs/jls/se8/html/jls-17.html) 에서는 ```volatile``` 키워드를 쓰는 등의 방법을 쓰지 않으면 보장이 되지 않는다. 다시말해 read 에도 스레드 동기화가 필요하다는 말이다. 또한 Constructor 가 호출되기 전에 외부스레드가 인스턴스에 접근할 수도 있어서 주의해야한다.[^so1]


## Dead Lock

기본적으로 두 개 이상의 lock 을 가지면 생길 수 있다. 

이를 해결하는 방법은 lock 대상에 순서를 부여하여 무조건 그 순서대로 lock 을 걸면 되지만 실제 상황에서 써먹긴 어렵다.


#### 외부 함수를 호출하는 경우

내부에서 lock 을 걸지말고 필요하면 복사해서 사용하는게 좋다.
왜냐하면 외부함수가 무엇인지 알 수 없어서 데드락의 위험이 있고, lock 거는 시간도 줄어들어 스레드를 효율적으로 쓸 수 있기 때문이다.



## Patterns

### Basic

mutex 나 lock 으로 스레드 동기화 기능이 기본적이다.

### Wait/Signal

타이머나 wait/signal 기능을 제공하는 언어가 많이 있다. 이를 통해서 thread pool 과 같이 많은 병렬/동시성 패턴을 구현할 수 있다. 

```java
mylock.lock();
try{
    while(isValidCondition) // Condition 을 반드시 체크 후에 원하는 로직으로 들어가야한다.
        myCondition.await();
    ...
} finally { table.unlock();}
```

이때 무의미하게 Thread 가 깨어나는 [Spurious wakeup](https://en.wikipedia.org/wiki/Spurious_wakeup) 을 유의하여 WakeUp 이후에 Condition 을 다시 체크해야한다. 왜냐하면 WakeUp 조건이 Race Condition 이 있는 경우, 예를들어 10 Thread 가 깨어났는데 하나만 깨어나면 되는 경우, 나머지 아홉은 쓸데없이 일어났으므로 다시 대기시켜야 하기 때문이다. 심지어 별 이유 없이 Thread 가 깨어날 수도 있다.


### [Double Checked Pattern](https://en.wikipedia.org/wiki/Double-checked_locking)

잘못쓰면 잡기 힘든 오류를 만들어내는 안티패턴이다. 대개 싱글톤이니 직접 구현하기 보단 안전하다고 판명된 코드를 쓰는게 좋다.




## 참고자료

[7가지 동시성 모델, 폴 부처](https://m.hanbit.co.kr/store/books/book_view.html?p_code=B3745244799)

[^so1]:[java constructor and thread safety, so](https://stackoverflow.com/questions/61803042/java-constructors-and-thread-safety)