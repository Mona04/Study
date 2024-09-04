---
title: WPF Binding 주의사항
description : WPF Binding 이 언제되는가?
date: 2024-08-22
tags: [wpf]
---

## Binding Timing

나는 Wpf Control 이 Load 되기 이전에 Xaml Binding 이 완료됨이 보장되는 줄 알았었다. 
그래서　```Loaded``` 이벤트에 Binding 이 되어 있음을 가정하고 코드를 작성하여 문제가 발생한 적이 있다.

원인은 UI Thread 가 바빠서 Wpf Binding 프로세스가 ```Loaded``` 이벤트보다 뒤늦게 실행된 것이었다.

```Loaded``` 에 붙여 놓은 로직을 ```PropertyMetadata``` 에 등록한 컬백에 옮겨두어 문제를 해결하였다.