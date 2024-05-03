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

## Primitives


semaphore, mutex 등이 가장 대표적인 concurrency 를 위한 primitive 이다. 우리는 이를 통해서 더 복잡한 기능을 구현한다.

그러기에 앞서 Primitives 는 어떻게 구현되는가? 이는 운영체제와 하드웨어에 따라 구현방법이 다르다. 자세한 내용은 아래 영상을 참조하자.

<iframe width="560" height="315" src="https://www.youtube.com/embed/VxVF6QzwtwI?si=6iDSUkaWckzT5pSi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

https://www.cl.cam.ac.uk/teaching/1516/ConcDisSys/2015a-ConcurrentSystems-1B-L3-handout.pdf
https://learn.microsoft.com/en-us/dotnet/standard/threading/overview-of-synchronization-primitives


## Patterns

### basic

많은 환경에서 기본적으로 제공하는 스레드 동기화 기능은 __lock/unlock__, __wait/notify__ 가 있다.
+ __lock/unlock__ 은 해당 코드에서 오직 하나의 thread 만이 동시에 작업할 수 있음을 보장해주는 기능이다.
+ __wait 와 notify__ 는 한 thread 가 lock 을 풀고 다른 thread 에서 깨울 때 까지 대기하는 기능이다.

#### 주의사항

위 기능들을 이용해 아래에서 설명할 확장된 기능들을 만들 수 있다. 하지만 직접 구현하는 것은 동시 프로그래밍 성격 상 실수를 범하기 쉬우므로 자제하는게 좋다. 

lock/unlock 을 각각 호출하는 경우 ```try...finally``` 문으로 예외가 일어나도 반드시 unlock 을 할 수 있도록 해야한다.

```java
synchronized(this){
    while(isValidCondition) // wake 후 Condition 을 반드시 체크해야하므로 if 로 대체 불가능.
        wait();
}
```

wait 시 의도하지 않았는데 Thread 가 깨어나는 [__Spurious wakeup__](https://en.wikipedia.org/wiki/Spurious_wakeup) 을 유의하여 wakeup 이후에 Condition 을 다시 체크해야한다. 그래서 위처럼 ```while``` 문처럼 반복문을 사용하여 구현한다. 그렇지 않으면 의도치 않은 wakeup 이 발생한 경우 공유자원에 여러 스레드가 접근하게 되어 프로그램이 오작동을 할 수 있다.


### Condition

```java
mylock.lock();
try{
    while(isValidCondition) // wake 후 Condition 을 반드시 체크해야하므로 if 로 대체 불가능.
        myCondition.await();
    ...
} finally { table.unlock();}
```

java 의 ```java.util.concurrent``` 에서 제공하는 ```ReentrantLock``` 은 wait 에 들어간 특정한 thread 를 지정해서 notify 를 줄 수 있는 기능이 있다. 그 밖에 일정 시간동안 lock 을 시도하고 아니면 다른 분기를 탈 수 있는 기능 등이 들어 있다.


아래의 코드는 특정 thread 를 지정해 notify 를 주는 기능을 구현한 것이다. 이처럼 많은 추가 기능들은 위에서 살펴본 기본적인 기능을 바탕으로 짜여져 있다. 물론 실제 개발 시에는 직접 구현을 지양하는게 좋다.


```java title="MyBaseLock.java"
// 내부에서만 사용하는 클래스
public class MyBaseLock
{
    private volatile boolean isLocked = false;

    public synchronized void lock() throws InterruptedException{
        while(isLocked){ // 내부 락
            wait();
        }
        isLocked = true;
    }
    public synchronized void unlock(){
        isLocked = false;
        notify();
    }
    public synchronized void await(MyBaseLock lock2) throws InterruptedException
    {
        isLocked = true;
        while(isLocked){
            wait();
        }
    }
}
```

```java title="MyCondition.java"
public class MyCondition {
    MyBaseLock mLock;
    MyBaseLock mPrivateLock = new MyBaseLock();
    public MyCondition(MyBaseLock lock)
    {
        mLock = lock;
    }
    public void signal() { mPrivateLock.unlock(); }
    public void await() throws InterruptedException { mLock.unlock(); mPrivateLock.await(mLock); mLock.lock();}
}
```

```java title="MyLock"
public class MyLock {
    MyBaseLock mLock = new MyBaseLock();
    public MyCondition newCondition(){
        return new MyCondition(mLock);
    }
    public void lock() throws InterruptedException {
        mLock.lock();
    }
    public void unlock() throws InterruptedException {
        mLock.unlock();
    }
}
```

d


### [Double Checked Pattern](https://en.wikipedia.org/wiki/Double-checked_locking)

잘못쓰면 잡기 힘든 오류를 만들어내는 안티패턴이다. 대개 싱글톤이니 직접 구현하기 보단 안전하다고 판명된 코드를 쓰는게 좋다.





## Dead Lock

기본적으로 두 개 이상의 lock 을 가지면 생길 수 있다. 

이를 해결하는 방법은 lock 대상에 순서를 부여하여 무조건 그 순서대로 lock 을 걸면 되지만 실제 상황에서 써먹긴 어렵다.

그래서 일단 Lock 을 동시에 두개 쓰는 것은 정말로 자제하는게 좋다.


#### 외부 함수를 호출하는 경우

내부에서 lock 을 걸지말고 필요하면 복사해서 사용하는게 좋다.
왜냐하면 외부함수가 무엇인지 알 수 없어서 데드락의 위험이 있고, lock 거는 시간도 줄어들어 스레드를 효율적으로 쓸 수 있기 때문이다.


## 참고자료

[7가지 동시성 모델, 폴 부처](https://m.hanbit.co.kr/store/books/book_view.html?p_code=B3745244799)

[^so1]:[java constructor and thread safety, so](https://stackoverflow.com/questions/61803042/java-constructors-and-thread-safety)