---
title: Make Blog using Gatsby - 3
date: 2023-06-21 T22:12:03.284Z
description: Hello World
---


## 필요한 기능

Category 별로 글 목록을 볼 수 있어야하고, Post Title, Content, Tag 및 Category 로 검색기능이 필요하다.

다크모드가 필요하다.

공부상태를 이쁘게 표현할 Component 를 홈 화면에 띄우고 싶다.

latex 지원을 위해서 mathjax 를 생각하고 있다.

영작을 위해 한영모드가 있으면 좋겠다. 

밑에 빌드된 시간을 넣었으면 좋겟다.

가장 최근에 수정된 파일만 빌드해서 최적화.

openai api 써서 페이지도 하나

마비옛체 서체의 출처 표기를 권장합니다. 예) 이 페이지에는 마비노기가 제공한 마비옛체 서체가 적용되어 있습니다.

rehype-prism-plus 를 쓴 [이유](https://www.timegambit.com/blog/blog-log/compare-code-parsing-library)
=> 조금 용량 많아도 더 이쁨

## 디자인하기

SASS 와 다크모드를 우선 구현하자.

