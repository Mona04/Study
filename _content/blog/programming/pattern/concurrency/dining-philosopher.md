---
title: Dining Philosopher
description: Dining Philosopher 관련 정리
date: 2024-08-23
tags: [concurrency]
---

## [Dining Philosopher](https://en.wikipedia.org/wiki/Dining_philosophers_problem)

데드락을 설명하는 고전적인 예제이다. 데드락의 요건은 여러가지가 있는데 주로 자원점유와 순환성을 제거하여 해결한다.


### 간단한 해결방안들

$$n$$ 명의 철학자가 있는 경우 최대 $$n-1$$ 명의 철학자만 포크를 들면 순환이 생기지 않는다. 사전에 참가자 수를 모르면 쓸 수 없는 단점이 있다.

포크에 순서를 부여해 순서 대로 포크에 락을 걸면 순환이 생기지 않는다. 필요한 자원을 사전에 모르면 비효율적이게 되는 단점이 있다. 예를들어 3,5번을 얻고 2번을 얻어야 하는 걸 뒤늦게 알았을 경우 3,5를 풀고 다시 2,3,5를 얻어야하는 비효율적인 상황이 생길 수 있다.

### Lock and await

아래는 직접 구현한 lock 과 conditional 을 사용해 식사하는 철학자 문제를 구현한 것이다.(ReentrantLock 을 쓰기 싫었다.) 큰 로직은 다익스트라 방법이랑 비슷하다. 필요한 포크가 없으면 점유를 푼 뒤 대기하고 이웃은 포크를 다 쓴 후 대기를 풀어준다. 점유를 푸는 로직이 빠져도 무조건 포크 두개를 동시에 들어야 해서 데드락은 걸리지 않지만 효율성이 떨어진다.

```java title="Main.java"
package dining_philosohper;
public class Main {

  public static void main(String[] args) throws InterruptedException {
    Philosopher[] philosophers = new Philosopher[5];
    MyLock table = new MyLock();

    int cnt = 5;
    for (int i = 0; i < cnt; ++i)
      philosophers[i] = new Philosopher(table);
    for (int i = 0; i < cnt; ++i) {
      philosophers[i].setLeft(philosophers[(i - 1 + cnt) % cnt]);
      philosophers[i].setRight(philosophers[(i + 1) % cnt]);
      philosophers[i].start();
    }
    for (int i = 0; i < cnt; ++i)
      philosophers[i].join();
  }
}

```

```java title="MyBaseLock.java"
package dining_philosohper;
public class MyBaseLock
{
    private volatile boolean isLocked = false;
    public synchronized void lock() throws InterruptedException{
        while(isLocked) wait();
        isLocked = true;
    }
    public synchronized void unlock(){
        isLocked = false;
        notify();
    }
    public synchronized void await(MyBaseLock lock2) throws InterruptedException
    {
        isLocked = true;
        while(isLocked) wait();
    }
}
```

```java title="MyCondition.java"
package dining_philosohper;
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

```java title="MyLock.java"
package dining_philosohper;
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

```java title="Philosopher.java"
package dining_philosohper;

class Philosopher extends Thread {

  private int thinkCount;
  private volatile boolean eating;
  private Philosopher left;
  private Philosopher right;
  private MyCondition condition;
  final private MyLock table;

  public Philosopher(MyLock table) {
    eating = false;
    this.table = table;
    condition = table.newCondition();
  }

  public void setLeft(Philosopher left) { this.left = left; }
  public void setRight(Philosopher right) { this.right = right; }

  public void run() {
    try {
      while (true) {
        think();
        eat();
      }
    } catch (InterruptedException e) {}
  }

  private void think() throws InterruptedException {
    Thread.sleep((int)(Math.random()*1000));
    System.out.println("Philosopher " + this + " has thought " + ++thinkCount + " times");
  }

  private void eat() throws InterruptedException {
    try {
      table.lock();
      while (left.eating || right.eating)
        condition.await();

      assert !left.eating && !right.eating;
      eating = true;
      
    } finally {
      table.unlock();
    }
    
    Thread.sleep((int)(Math.random()*1000));
    System.out.println("Philosopher " + this + " has eaten");
    eating = false;
    
    right.condition.signal();
    left.condition.signal();
  }
}
```

### Chandy/Misra solution

[이 논문](https://www.cs.utexas.edu/~misra/scannedPdf.dir/DrinkingPhil.pdf)
의 내용이다.

특징은 lock 없이 가능하며 지역적 상태만 가지고 문제를 해결할 수 있어 분산 시스템에도 적용 가능한 방법이라는 것이다. 단점은 초기 상태가 특정 상태가 되어야 한다는 것이다. 

아이디어는 DAG 를 만드는 것이다. 우선순위가 높은 프로세스에서 낮은 프로세스로 선이 이어진다. DAG 성격 상 이웃한 정점의 깊이는 다르기 때문에 conflict 가 발생하는 이웃 정점 간의 구분가능한 속성이 된다(__distinguishability__ 만족). 그리고 어떠한 규칙에 따라 DAG 를 수정하면 임의의 정점의 깊이가 유한한 시간 안에 0이 되어 __fairness__ 를 만족하게 된다.

자세히 들어가보자. 철학자는 세가지 속성을 갖는다. (논문에는 추가로 토큰이 있지만 생략하겠음.) 
1. 철학자의 상태. 생각/배고픔/먹음의 세가지 상태가 있다.
2. 포크를 들고있는지 여부.
3. 포크가 더러운지 여부.

포크의 더러움 여부가 다른 해결방안과의 차별점임에 주목하자. 이러한 임의의 철학자 u, v 는 서로 공유하는 포크를 다음의 규칙에 따라 가진다.
1. u 가 먹는 상태가 아니고 깨끗한 포크를 들고 있으면 포크를 계속 가진다.
2. u 가 먹는 상태가 아니고 더러운 포크를 들고 있으면 포크를 깨끗하게 해서 v 에게 준다.
3. u 가 먹는 상태가 아니고 깨끗한 포크를 모두 들고 있으면 식사를 한다. 그 후 포크가 모두 더러워진다. (이는 두번째 규칙으로 이어진다.)

위의 규칙을 살펴보면 임의의 철학자 u, v 에 대해서 u 가 우선적으로 포크를 갖는 경우는 다음과 같다. (나머지 경우는 v 가 우선순위를 갖는다.)
+ u 가 포크를 들고 있고 포크가 깨끗하다.
+ v 가 포크를 들고 있고 포크가 더럽다.
+ v 가 포크를 u 로 보내는 중이다.

임의의 철학자 u, v 에 대해서 u 가 포크에 대한 우선순위가 있을 때 u 에서 v 로 선이 이어진다고 하자. 이렇게 만든 그래프를 우선순위 그래프 H 라고 하자. 이 그래프는 세가지 특징이 있다.
1. 초기 상태가 DAG 를 만족하는 경우 이후에도 계속 DAG 이다. 증명은 간단한게 포크의 상태가 바뀔 때만 그래프가 변하는데 이때 모든 간선이 한 정점의 방향으로 가게 되어 순환이 생길 수 없기 때문이다.
2. 유한한 시간 안에 H 가 바뀌어 임의의 프로세스 p 의 깊이가 0 가 된다. 증명은 깊이에 대한 수학적 귀납을 써야하는데 생략한다. 위 논문 참고.
3. H 그래프의 변경은 지역적으로 이루어진다.(한번에 한 정점과 그 이웃만 바뀐다.) 그래서 한 정점이 H 전체를 알 필요가 없어 분산 시스템을 가능하게 한다.

위 로직은 다음을 만족하는데 참고로 적어둔다.
+ __distinguishability__ 는 충돌이 일어날 때 적어도 하나 이상의 프로세스가 구분가능해야 한다는 것이다. 구분이 불가능하면 우리는 충돌 시 프로세스를 랜덤하게 선택할 수 밖에 없고 이는 곧 확률에 기반한 알고리즘이라는 말이 된다. 이를 위해 프로세스에 ID 같은 상태가 부여되어야 한다. 여기서는 우선순위 DAG H 상의 깊이를 사용한다. 
+ __fairness__ 는 충돌이 일어날 때 유한한 시간 안에 모든 프로세스가 한번 이상 수행이 되어야한다는 것이다. 이를 위해선 프로세스에 부여한 상태 외의 시간 스탬프 같은 부가 상태를 사용할 수도 있지만 여기선 쓰지 않고 이 속성을 만족시킨다.


#### 구현

위를 자바로 구현하면 다음과 같다. 아래 예제는 전형적인 원형 테이블이 아니라 모든 철학자들 간에 포크가 있도록 구성하였다. 이웃 설정하는 부분만 바꾸면 전형적인 원형 테이블로도 수행할 수 있다.

```java title="Main.java"
package dining_philosopher2;
public class Main {

  public static void main(String[] args) throws InterruptedException {
    int cnt = 5;
    Philosopher[] philosophers = new Philosopher[cnt];

    for (int i = 0; i < cnt; ++i)
      philosophers[i] = new Philosopher();
    for(int i = 0; i < cnt; i++){
      for(int j = 0; j < cnt; j++){
        if(i == j) continue;
        philosophers[i].setNeighbor(philosophers[j], i < j);
      }
      philosophers[i].start();
    }
    for (int i = 0; i < cnt; ++i)
      philosophers[i].join();
  }
}
```

```java title="Philosopher.java"
package dining_philosopher2;

import java.util.HashMap;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;

public class Philosopher extends Thread {
    class ForkState{
        public boolean hasFork, isDirty;
        ForkState(boolean fork){
            isDirty = true;
            hasFork = fork;
        }
    }
    class Message{
        public Philosopher sender;
        public int type;
        public Message(Philosopher sender){
            this.sender = sender;
        }
    }

    HashMap<Philosopher,Philosopher.ForkState> states = new HashMap<Philosopher,Philosopher.ForkState>();
    Queue<Message> msgQueue = new ConcurrentLinkedQueue<Message>();
    boolean isHungry = false;

    public void setNeighbor(Philosopher neighbor, boolean fork){
        states.put(neighbor, new ForkState(fork));
    }
    public void run() {
        try {
          while (true) {
            changeState();
            think();
            eat();
          }
        } catch (InterruptedException e) {}
      }

    void receiveFork(Philosopher from){
        msgQueue.add(new Message(from));
    }
    void changeState(){
        while(msgQueue.isEmpty() == false){
            Message n = msgQueue.poll();
            ForkState state = states.get(n.sender);
            state.hasFork = true;
            state.isDirty = false;
        }

        states.forEach((neighbor, state)->{
            if(state.hasFork && state.isDirty){
                neighbor.receiveFork(this);
                state.hasFork = false;
                state.isDirty = false;                
            }
        });
    }
    
    int thinkCount = 0;
    void think() throws InterruptedException{ 
        if(isHungry)return;

        isHungry = true;
        Thread.sleep((int)(Math.random()*1000));
        System.out.println("Philosopher " + this + " has thought " + ++thinkCount + " times");    
    }
    static Object lock = new Object();
    void eat() throws InterruptedException{
        boolean canEat = states.values().stream().allMatch(state -> state.hasFork && !state.isDirty);
        if(canEat == false) return;

        // test 용
        synchronized(lock){
            assert(states.keySet().stream().allMatch(neighbor -> !neighbor.states.get(this).hasFork));
        }

        Thread.sleep((int)(Math.random()*1000));
        System.out.println("Philosopher " + this + " has eaten");
        states.forEach((neighbor, state)->{
            state.isDirty = true;
        });
        isHungry = false;

        // test 용
        synchronized(lock){
            assert(states.keySet().stream().allMatch(neighbor -> !neighbor.states.get(this).hasFork));
        }
    }
}
```

#### Drinking Problem

Drinking Problem 은 Dining Problem 의 일반화로 달라지는 점은 철학자가 배가 고플 때 이웃 간에 공유되는 포크들 중에 일부만 필요하고 그 집합이 배가 고플 때마다 달라지는 점이다. 용어가 헷갈릴 수 있어 논문에선 포크를 병으로 배고픔을 목마름으로 바꿔 표현하여 Drinking Problem 이 되었다.

이 문제의 해결방법은 Dining Problem 의 해결방법을 조금 수정한 것이다.

철학자는 [생각함, 배고픔, 먹음] 과 [조용함, 목마름, 마심] 의 두 상태를 가진다. 이 두 상태는 동기화 되기 위하여 다음과 같은 규칙을 갖는다.
1. (생각함 > 배고픔) 이 되기 위해선 목마름 상태어야 한다.
2. (배고픔 > 먹음)  이 되기 위해선 포크가 다 있어야 한다.(기존과 같다.)
3. (먹음 > 생각함)  이 되기 위해선 목이 마르지 않아야 한다.

포크의 움직임은 기존과 같고, 병의 움직임은 u, v 가 공유하는 병을 u 가 가진 경우 
1. 그 병이 u 에게 필요 없거나
2. u 가 마시는 중이 아니면서 u 가 포크를 가지지 않는 경우
u 가 v 에게 병을 줘야한다.

1번의 경우는 trivial 하고, 2 의 경우 포크가 더러우면 병을 줬다가 포크를 받고 곧 다시 병을 받게 된다. 반대로 포크가 깨끗하면 v 의 우선순위가 더 높으니 v 가 먹을 때 까지 기다리게 된다. v 는 식사를 위해서 포크를 모으고 병 역시 모으게 된다. 이는 v 보다 우선순위가 높은 곳에도 적용이 되어 우선순위가 높은 철학자부터 먹고 마시기를 하게 된다. 마침내 v 가 식사를 마치면 u 가 병을 받게 된다.