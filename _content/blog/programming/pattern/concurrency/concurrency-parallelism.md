---
title: Patterns for Concurrency Programming
description: Concurrency Programming 에서 쓰이는 도구와 쉽게 범할 요류들 정리
date: 2024-04-29
tags: [design pattern, concurrency]
---

## 병렬성과 동시성

병렬성(parallelism)은 문제에 대한 해결 수단 중 하나라고 생각할 수 있다. 
+ 32비트, 64비트 cpu 처럼 기본 처리 단위도 병렬성을 갖고 있다. 나아가 cpu 는 pipelining, out-of-order execution, speculative execution 등으로 병렬성을 통해 성능을 향상시키고 있다. SIMD 같은 명령어 셋 역시 그렇다. 나아가 멀티코어프로세서 역시 병렬성을 갖고 있다.

동시성(concurrency)은 문제의 속성이라고 생각할 수 있다. 노래를 들으며 웹서핑을 하는 것부터 유튜브가 세계 곳곳에 지어놓은 데이터센터까지 생활 속에서 다양하게 찾을 수 있다.

이 글은 위의 성격을 갖는 프로그램을 만들기 위해 사용하는 도구들과 쉽게 범할 오류들을 공부하며 정리하는 글이다.

## Thread Synchronize

### Lock

multithread programming 에서는 critical section 문제가 존재한다. 이를 해결하기 위해 semaphore, mutex, conditional variable 이라는 개념이 만들어졌다. 이들은 kernal 에서 운영체제와 하드웨어의 지원을 받아 구현되며 환경마다 구현방법이 다르다. 이에 대해선 아래를 참고.

<iframe width="560" height="315" src="https://www.youtube.com/embed/VxVF6QzwtwI?si=6iDSUkaWckzT5pSi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
<br/>

이를 기초로 해서 더 복잡한 기능이 구현된다.
+ 예를들어 monitor 는 java 나 c# 의 프레임워크 차원에서 제공하는 기능으로 process 안에서의 mutex 와 conditional variable 기능을 지원한다. process 간에는 적용되지 않으므로 파일 시스템 등에는 적절하지 않지만 대신 더 빠르다.[^so-mutex-vs-monitor]
+ 이외에 interrupt 가능한 lock(일반적으로 데드락 스레드는 interrupt 불가능하다), 타임아웃 기능이 붙은 lock 도 있다.
+ 하드웨어에서 지원하지 않는 크기의 데이터에 대한 atomic 연산을 구현하기 위해 lock 을 내부적으로 사용한다.

### Memory Model

lock 뿐만 아니라 Memory Model 이 환경마다 다르므로 주의할 필요가 있다.

+ c 환경에서 힙에 있는 값을 변경하면 모든 스레드에 적용이 된다. 
+ [Java Memory Model](https://docs.oracle.com/javase/specs/jls/se8/html/jls-17.html) 에서는 ```volatile``` 키워드를 쓰는 등의 방법을 쓰지 않으면 보장이 되지 않는다. 다시말해 read 에도 스레드 동기화가 필요하다는 말이다. 또한 Constructor 가 호출되기 전에 외부스레드가 인스턴스에 접근할 수도 있어서 주의해야한다.[^so1]


### 주의사항

#### Dead Lock

기본적으로 두 개 이상의 lock 을 가지면 생길 수 있는 Dead Lock 은 두가지 규칙만 지키면 예방은 할 수 있다.
1. 두개 이상의 lock 을 건다면 lock 의 순서를 부여하여 그 순서대로만 한다. 
2. lock 을 걸고 외부 함수를 호출하는 경우 잠재적으로 위 규칙을 깰 수 있으니 자제한다.

lock 을 걸면 안정성 테스트도 힘들어서 가능하면 lock 을 최소화하는게 좋다. 예를 들어서 race condition 이 있는 list 에 대해 루프를 돈다면 그 전체를 lock 걸고 복사한 뒤 이 복사본에 대해 루프를 도는게 좋다.

유사품으로 live lock 이 있다.

#### Try Catch

```java
mylock.lock();
try{
    ...
} finally { table.unlock();}
```

lock/unlock 을 각각 호출하는 경우 ```try...finally``` 문으로 예외가 일어나도 반드시 unlock 을 할 수 있도록 해야한다.

#### Spurious Wakeup

```java
synchronized(this){
    while(isValidCondition) // wake 후 Condition 을 반드시 체크해야하므로 if 로 대체 불가능.
        wait();
}
```

wait 시 의도하지 않았는데 Thread 가 깨어나는 [__spurious wakeup__](https://en.wikipedia.org/wiki/Spurious_wakeup) 을 유의하여 wakeup 이후에 Condition 을 다시 체크해야한다. 그래서 위처럼 ```while``` 문처럼 반복문을 사용하여 구현한다. 그렇지 않으면 의도치 않은 wakeup 이 발생한 경우 공유자원에 여러 스레드가 접근하게 되어 프로그램이 오작동을 할 수 있다.

### Patterns

copy on write array list. 내부 리스트 값을 변경할 때 카피 본을 생성하고 외부에서 루프를 돌 때는 카피본에 대해서 돌게하여 루프 시에 lock 을 걸지 않도록 해준다. 대신 수정이 잦으면 copy 때문에 더 느릴 수 있다.

#### Thread Pool

Thread 의 생성 비용 및 과도한 생성을 막는 패턴이다. 이는 다양한 패턴으로 분화된다.

분할정복을 위한 fork/join pool, 

#### [Double Checked Pattern](https://en.wikipedia.org/wiki/Double-checked_locking)

잘못쓰면 잡기 힘든 오류를 만들어내는 안티패턴이다. 대개 싱글톤에서 사용되므로 직접 구현하기 보단 안전하다고 판명된 코드를 쓰는게 편하다.

#### Producer Consumer Pattern

Producer 와 Consummer 사이를 concurrency 를 지원하는 queue 로 연결해서 multi-threads 의 이점을 살리는 패턴이다. 이때 Producer 의 생산 속도가 너무 빠르면 메모리가 부족할 수 있으므로 둘 사이의 속도를 조절하는게 중요하다. java 에서는 ```ArrayBlockingQueue``` 가 이를 지원하는 예이다.

#### Lock Striping

HashMap 의 Atomicity 최적화 기법. Container 전체가 아니라 Bucket 마다 lock 을 걸게 해서 높은 수준의 병렬성을 지원한다.

0.

## 참고자료

[7가지 동시성 모델, 폴 부처](https://m.hanbit.co.kr/store/books/book_view.html?p_code=B3745244799)

[^so1]:[java constructor and thread safety, so](https://stackoverflow.com/questions/61803042/java-constructors-and-thread-safety)

[^so-mutex-vs-monitor]:[mutex vs montior, so](https://stackoverflow.com/questions/38159668/monitor-vs-mutex)