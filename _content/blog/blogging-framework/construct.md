---
title: Make Blog using Gatsby - 3
date: 2023-06-21 T22:12:03.284Z
description: Hello World
---

## 구현전


### 필요한 기능

Category 별로 글 목록을 볼 수 있어야하고, Post Title, Content, Tag 및 Category 로 검색기능이 필요하다.

다크모드가 필요하다.

공부상태를 이쁘게 표현할 Component 를 홈 화면에 띄우고 싶다.

latex 지원을 위해서 mathjax 를 생각하고 있다.

영작을 위해 한영모드가 있으면 좋겠다. 

밑에 빌드된 시간을 넣었으면 좋겟다.

가장 최근에 수정된 파일만 빌드해서 최적화.

openai api 써서 페이지도 하나

마비옛체 서체의 출처 표기를 권장합니다. 예) 이 페이지에는 마비노기가 제공한 마비옛체 서체가 적용되어 있습니다.


### 프레임워크

[SSG 프레임워크 성능 비교](https://css-tricks.com/comparing-static-site-generator-build-times/)

react 를 써보고 싶어 gatsby 랑 nextjs 중에 고민했는데 컴파일 속도보고 nextjs 로 정했다.



## 기능구현

### CMS

내가 필요한 기능은 markdown hot reload 와 검색기능을 위한 전체 데이터 최적화이다. 

결론부터 말하면 나는 그냥 [ContentLayer](https://www.contentlayer.dev/)를 쓰기로 했다. 
글을 쓰는 2023.07 에는 아직 베타버전이라 버그도 많지만 내가 필요한 기능이 모두 있고 nextjs 공식 사이트에서 지원한다고 적혀져 있어 이후 지원도 기대할 수 있기 때문이다.

이전에 내가 고려한 것은  [next remote watch](https://github.com/hashicorp/next-remote-watch) 였는데 next.js 12 버전까지 지원하고 이후는 소식이 뚝 끊겨있었다. 
그래서 내가 직접 파일변경 이벤트를 받아오고 nextjs hot reload api 를 호출하려고 했는데 이게 private api 라 숨겨져있었고 찾을 수 없었다. 
나중에 보니까 ```next/router``` 를 사용하던데 자세히는 모르겠다.


### Syntax Highlight

Contentlayer 에서 html 로 변환할 때 code 부분에 rehype 도 처리해준다.

이때 

rehype-prism-plus 를 쓴 [이유](https://www.timegambit.com/blog/blog-log/compare-code-parsing-library)
=> 조금 용량 많아도 더 이쁨
+ cdn 으로 css 들고오면 로딩도 빠름.
+ https://cdnjs.com/libraries/highlight.js

https://bepyan.github.io/blog/nextjs-blog/3-mdx-plugin