---
title: next-js global scss order in production 
description : ""
date: 2024-02-01
tags: [web, nextjs, css, scss]
---

## 문제점

나는 nextjs 에서 scss 를 이용해 전역변수 및 공통 스타일을 정의해두었다.

dev 모드에서는 가장 위에 ```global.scss``` 가 컴파일되어 있어서 아무 문제가 없었다. 

그런데 build 하고 보니까 module.scss 가 맨 위로 가 있었다.

나의 경우엔 순서가 꼬인 덕분에 ```@import```  중간에 가게 되어서 
폰트도 이상하게 나오고 
브라우저도 ```@import``` 문이 css 파일 중간에 가 있다고 이슈를 뱉었다.


## 해결

깃허브 이슈도 뒤져봤는데 별게 없어서 그냥  ```<link/>``` 로 처리했다. 

어차피 이 방법이 파일을 병렬로 로딩해서 성능이 유의미하게 좋다. 어차피 무의미한 속도지만 말이다.

이곳 저곳에 스타일 관련 내용이 흩어지게 되어서 이렇게 하기 싫었는데 어쩔 수가 없었다.
