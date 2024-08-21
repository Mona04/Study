---
title: c runtime library 에 대하여.
description: mt, md 는 무엇일까? crt 는 무엇일까?
date: 2024-08-07
tags: [cpp]
---

## Runtime Library

우리가 작성하는 프로그램이 운영체제에서 돌아갈 수 있도록 필요한 라이브러리를 __Runtime Library__ 라고 한다. 예를들어 cpp 은 libcmt.lib, msvcrt.lib. net 은 clr, java 는 jvm, js 는 node.js 가 대표적인 runtime library 이다.

## MT, MD

mt, md 는 visual studio 가 제공하는 crt(c runtime library) 의 종류를 말하는 것이다. mt 는 libcmt.lib 가 md msvcrt.lib 가 작성한 프로그램에 링크된다. 중요한 차이점은 링크하는 방식으로 전자는 정적으로 후자는 동적으로 링크가 된다. 그래서 정적링크/동적링크의 장단점을 그대로 갖고있다. 예를들어 전자는 crt 를 포함해야 하므로 dll 크기가 조금더 커지게 된다. 후자는 동적 링크이기 때문에 crt dll 이 실행환경에 필요하고 그 버전에 영향을 받는다.

프로그램을 작성할 때 특히 주의할 점은 mt 의 경우 dll 마다 힙이 할당이 된다는 것이다. 이는 당연한데 메모리를 관리하는 crt 가 정적링크가 되어 dll 마다 돌고 있기 때문이다. 그래서 메모리를 할당한 dll 바깥에서 메모리를 해제하면 문제가 생긴다.

많은 경우에 배포가 용이한 mt 가 선호되는 듯 하다.

## Linux?

linux 의 경우 window 와 dll 연결 방식이 다르다. [so](https://stackoverflow.com/questions/41903007/loading-the-c-runtime-on-linux) 참고.