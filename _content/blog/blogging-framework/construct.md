---
title: "Make a Blog using NextJS"
date: 2023-06-21
description: "Hello World"   
---

## 필요한 기능

### 블로그 포스트 관련

1. 블로그 포스트를 Category 별로 표시하여 사이드 메뉴에 표시해야한다.

2. Post Title, Content, Tag 및 Category 로 검색기능이 필요하다.

3. 코드를 이쁘게 나오게 하고 싶다.

4. 수식 표현을 위해 latex 지원이 필요하다.(mathjax?)

### 페이지 관련

1. 다크모드가 필요하다.

2. 밑에 가장 최근에 블로그를 업데이트한(빌드한) 시간을 표시하고 싶다.

### 기타

공부상태 이쁘게 표현해서 화면에 띄우고 싶다. 

영작용 포스트 페이지가 필요하다. 한글 / 영어 이렇게 나오게 하고 싶다.

open ai api 를 이용해서 뭐 하나 만들고 싶다.



## 프레임워크 및 외부모듈

### 웹 개발 프레임워크

[SSG 프레임워크 성능 비교](https://css-tricks.com/comparing-static-site-generator-build-times/)

react 를 써보고 싶어 gatsby 랑 nextjs 중에 고민했는데 컴파일 속도보고 nextjs 로 정했다.


### CSS 프레임워크

[Tailwind 장단점](https://ykss.netlify.app/translation/the_pros_and_cons_of_tailwindcss/)

[TailwindCSS 사용기](https://fe-developers.kakaoent.com/2022/220303-tailwind-tips/)


### CMS

내가 필요한 기능은 markdown hot reload 와 검색기능을 위한 전체 데이터 최적화이다. 

결론부터 말하면 나는 그냥 [ContentLayer](https://www.contentlayer.dev/)를 쓰기로 했다. 
글을 쓰는 2023.07 에는 아직 베타버전이라 버그도 많지만 내가 필요한 기능이 모두 있고 nextjs 공식 사이트에서 지원한다고 적혀져 있어 이후 지원도 기대할 수 있기 때문이다.

이전에 내가 고려한 것은  [next remote watch](https://github.com/hashicorp/next-remote-watch) 였는데 next.js 12 버전까지 지원하고 이후는 소식이 뚝 끊겨있었다. 
그래서 내가 직접 파일변경 이벤트를 받아오고 nextjs hot reload api 를 호출하려고 했는데 이게 private api 라 숨겨져있었고 찾을 수 없었다. 
나중에 보니까 ```next/router``` 를 사용하던데 자세히는 모르겠다.


### Search Framework

[rhostem 의 커스텀 검색](https://blog.rhostem.com/posts/2018-08-23-blog-search)

[lunrjs](https://lunrjs.com/)


### Syntax Highlight

Contentlayer 에서 html 로 변환할 때 code 부분에 rehype 도 처리해준다.

이때 

rehype-prism-plus 를 쓴 [이유](https://www.timegambit.com/blog/blog-log/compare-code-parsing-library)
=> 조금 용량 많아도 더 이쁨
+ cdn 으로 css 들고오면 로딩도 빠름.
+ https://cdnjs.com/libraries/highlight.js

https://bepyan.github.io/blog/nextjs-blog/3-mdx-plugin
