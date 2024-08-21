---
title: How DI works in Flutter.
description: Flutter 의 Provider Pattern 이 어떻게 구현되는지 살펴보기.
date: 2024-06-08
tags: [design pattern, flutter]
---


## flutter and react

flutter 는 js react 와 비슷한 면이 꽤 있다.

js react 는 virtual dom 과 코드 상의 HTML element 를 분리하여 성능과 개별편의를 둘다 잡았다.
flutter 도 마찬가지로 element 와 widget 이라는 흡사한 개념을 사용하고 있다. 

DI 를 위한 기능도 비슷하게 지원하고 있다. 
react 에서는 context provider 를 사용해 부모 노드 쪽에 필요한 서비스를 넣어두고 자식 노드에서 해당 서비스들을 가져올 수 있다.
flutter 에서는 [InheritedWidget](https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html) 을 통해 부모 노드에 등록한 서비스를 자식 노드에서 빠르게 가져올 수 있다.

react 를 써봤다면 이제 flutter 에서의 di 가 어떨지 대충 감이 잡혔을거라 생각한다.


## My Provider Example

flutter 친화적인 di 를 간단하게 만들어보자.

샘플은 한 버튼과 그 버튼을 클릭한 횟수가 전시되는 텍스트로 이루어진 한 화면을 갖고 있다.

기능이 단순하므로 view model 에서 클릭한 횟수를 관리하고 view 는 버튼클릭 시의 적절한 함수를 호출하고 클릭 횟수를 조회만 하도록 하자.

이를 위해 Provider 를 간단하게 구현했다.

```dart title="my_provider.dart"
import 'package:flutter/material.dart';

class MyProvider<T extends Listenable> extends InheritedNotifier<T>{
  MyProvider(
    {super.key, 
    required T Function() create,
    required super.child}) 
    : super(notifier: create());

  static T of<T extends Listenable>(BuildContext context)
    => context.dependOnInheritedWidgetOfExactType<MyProvider<T>>()!.notifier!;
}

```

상속을 하고 있는 ```InheritedNotifier``` 가 중요하다. 이 클래스는 ```Widget``` 이면서 특별한 기능을 가지고 있다. 바로 생성자에서 ```Listenable``` 인 ```notifier``` 를 받아서 신호를 받으면 자기 자신을 다시 그리게 하는 기능이다.

```dependOnInheritedWidgetOfExactType()``` 를 호출하는 것도 중요하다. 이 함수를 통해 flutter 에서는 ```BuildContext``` 만 있으면 상수 시간 내에 ```InheritedWidget``` 을 찾을 수 있다. 위 코드는 편의를 위해 전역함수로 한번 감싼걸 확인할 수 있다. 많이 쓰이는 패턴이다.

그럼 실제 어떻게 사용하는지 살펴보자.


```dart title="main.dart"
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: MyProvider<TouchCounterVM>(
        create: () => TouchCounterVM(), 
        child: const TouchCounterV())
    );
  }
}

```

위 코드는 위젯 트리의 가장 윗부분을 보여주고 있다. 
스스로 역시 위젯인 Provider 를 사용해 ```TouchCounterVM``` 을 하위 위젯인 ```TouchCounterV``` 에서 참조할 수 있도록 한다.

다음은 view 와 view model 을 살펴보자.



```dart title="view_model.dart"
import 'package:flutter/material.dart';

class TouchCounterVM  with ChangeNotifier{
  int count = 0;

  void onClick(){
    count++;
    notifyListeners();
  }

}

```

위 클래스는 ```Listenable``` 인 ```ChangeNotifier``` 를 상속하고 있다. 이 클래스가 신호를 주면 ```MyProvider``` 가 다시 그려질 것이다.


```dart title="view.dart"
import 'package:flutter/material.dart';
import 'package:test1/viewmodels/touch_counter_vm.dart';
import 'package:test1/widgets/MyProvider.dart';

class TouchCounterV extends StatelessWidget{
  const TouchCounterV({super.key});

  @override
  Widget build(BuildContext context) {
    var vm = MyProvider.of<TouchCounterVM>(context);

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            Text("Count : ${vm.count}"),
            TextButton(
              onPressed: (){ vm.onClick();}, 
              child: const Text("Touch"))
          ],
        ),    
      )
    );
   
  }

}

```

위 코드에서는 ```TouchCounterVM``` 에 대한 DI 가 이루어진 것을 확인할 수 있다. 사실 주입이라기엔 약간 부족하지만 이정도면 충분한 듯 하다.


## 정리

지금까지 flutter framework 의 기능을 사용해 간단한 DI 예제를 만들어보았다.

핵심은 필요한 모듈을 Widget Tree 에 위치시키고 자식 Widget 에서 필요한 모듈을 주입받을 수 있다는 것이다.

이제 ```Theme``` 같은 모듈에서 구현된 ```of(BuildContext)``` 함수나 ```Provider``` 같이 많이 사용되는 패키지의 작동원리를 쉽게 이해할 수 있을 것이다.


## 참고자료

https://api.flutter.dev/flutter/widgets/BuildContext/dependOnInheritedWidgetOfExactType.html

https://medium.com/@tigerasks/provider-based-dependency-injection-in-flutter-e04cb5bdd568