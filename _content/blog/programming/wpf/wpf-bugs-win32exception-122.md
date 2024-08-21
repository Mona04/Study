---
title: WPF Win32Exception 122
description : WPF 에서 윈도우 타이틀을 써야하는 이유
date: 2024-08-08
tags: [wpf]
---

## 오류 설명 

```txt title="log.txt"
Exception Info: System.ComponentModel.Win32Exception (122): 시스템 호출에 전달된 데이터 영역이 너
무 작습니다.
 at MS.Win32.UnsafeNativeMethods.GetWindowText(HandleRef hWnd, StringBuilder lpString, Int32
nMaxCount)
...
```


위 같은 오류가 프로그램을 장시간 켜두면 일어나서 문제를 찾아보았더니
[WPF Git](https://github.com/dotnet/wpf/issues/6026) 에서 이미 다뤄진 문제였다.

나의 경우 윈도우의 타이틀을 설정하지 않아서 생긴 문제로 보인다. 왜냐하면 설정 후에는 고쳐졌기 때문이다.

현재로서는 .net 버전이 8 이상부터는 고쳐진 것으로 보인다. 