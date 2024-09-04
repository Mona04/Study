---
title: Window Cmd Tips
description: Useful Window Command Tips.
date: 2024-08-23
tags: [tip]
---

## Cmd 열기

파일 탐색기의 경로창에 cmd 를 치면 해당 경로로 이동된 cmd 가 실행된다.

## Window Batch Script

### 폴더 일괄 삭제

```c
FOR /F "tokens=*" %G In ('DIR /B /AD /S obj') DO RMDIR /S /Q "%G"
```

```obj``` 이란 이름을 가진 폴더를 재귀적으로 찾아서 삭제하는 윈도우 배치 스크립트.　