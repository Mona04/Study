---
title: "My Blog: Requirements and Implementation"
description: 블로그 요구사항 및 구현 방법 서술.
date: 2023-06-21
tags: [blog]
thumbnail: /images/blog/construct-0.png
---

이 글은 현 블로그의 요구사항과 구현방법을 간략히 기술합니다.

## 필요한 기능

### 블로그 포스트 관련

+ 글 작성
  + [x] Markdown / MDX 를 사용할 예정이다.
  + [x] 글을 수정하면 바로 결과물을 보고싶다.

- 컨텐츠
  - [x] 코드를 이쁘게 나오게 하고 싶다. 코드에 복사버튼도 필요하다.
  - [x] 수식 표현을 위해 latex 지원이 필요하다.
  - [x] Table of Content 기능이 필요하다.
  - [x] 댓글 기능이 필요하다.

+ 검색
  + [x] 태그를 눌렀을 때 관련 글을 볼 수 있어야한다.
  + [x] 이전/다음 글 및 추천 포스트가 글 밑에 필요하다.
  + [x] 블로그 포스트를 Category 별로 표시하여 사이드 메뉴에 표시해야한다.
  + [x] 블로그 태그 리스트를 확인할 수 있어야 한다.
  + [x] 직접 키워드 검색을 할 수 있어야 한다. Post Title, Content, Tag 및 Category 로 키워드 지정 검색이 필요하다.



### 페이지 관련

1. [x] 다크모드가 필요하다.

2. [x] 밑에 가장 최근에 블로그를 업데이트한(빌드한) 시간을 표시하고 싶다. 

3. [ ] 블로그 글 목록은 Grid 형식이고 스크롤을 내릴 때마다 나타낼때 서서히 나타나는 효과가 있었으면 좋겠다. [ex](https://blog.itcode.dev/comments)



### 기타

+ [ ] 공부상태 이쁘게 표현해서 화면에 띄우고 싶다. 
+ [ ] 영작용 포스트 페이지가 필요하다. 한글 / 영어 이렇게 나오게 하고 싶다.
+ [ ] open ai api 를 이용해서 뭐 하나 만들고 싶다.




## 프레임워크

### 웹 개발 프레임워크

[SSG 프레임워크 성능 비교](https://css-tricks.com/comparing-static-site-generator-build-times/)

react 를 써보고 싶어 gatsby 랑 nextjs 중에 고민했는데 컴파일 속도보고 nextjs 로 정했다.


### CSS 프레임워크

[Tailwind 장단점](https://ykss.netlify.app/translation/the_pros_and_cons_of_tailwindcss/)

[TailwindCSS 사용기](https://fe-developers.kakaoent.com/2022/220303-tailwind-tips/)

TailwindCSS 가 편한데 복잡한건 보기가 힘들어서 module.css 랑 병행해서 쓰고 있다.


### CMS

콘텐츠 관리 프레임워크는 GraphGL 이나 ```next/mdx``` 등을 써보려다가 [contentlayer](https://www.contentlayer.dev/) 가 블로그용으로 쓸만해서 쓰고 있었다. md/mdx 에 필요한 기능인 remark/rehype 플러그인 및 yaml metadata 도 잘 작동하고, hot reload 도 잘 되고, 전체 글 목록도 js object 로 얻을 수 있어서 필요한 기능은 다 있었다. 무엇보다 단순히 js 코드를 생성하는 거라 Output 이 간단한게 마음에 들었다.

그런데 이 모듈은 더이상 관리가 안되어 버그도 고쳐지지 않고 NextJS 14 랑 호환되지 않고있다. 그래서 비슷한 기능을 직접 구현한 [archivelayer](https://www.npmjs.com/package/archivelayer) 를 사용하고 있다.


### Search Framework

[rhostem 의 커스텀 검색](https://blog.rhostem.com/posts/2018-08-23-blog-search)

[lunrjs](https://lunrjs.com/)

외부 검색 엔진에 내 글을 올리는 것이 마음에 안들고 정적 블로그기도 해서 jekyll 때도 신세를 졌던 ```lunr``` 을 사용하기로 했다.


### Comment Framework

[Giscus](https://giscus.app/) 를 사용하기로 했다. 

DISQUS 는 광고가 붙어서 제외했고 Utterance 보다 Giscus 가 여러 기능이 있었기 때문이다.



## Content

### Code Highlight

많이 사용되는 것으로는
[Rehype Highlight](https://www.npmjs.com/package/rehype-highlight), 
[Rehype Prism Plus](https://www.npmjs.com/package/rehype-prism-plus), 
[Rehype Pretty Code](https://rehype-pretty-code.netlify.app/)
가 있었는데 난 마지막 것을 선택했다.
+ server side 에서 미리 파싱하는 특성 상 html 용량이 조금 나가지만 더 빠르다.
+ 줄/단어 하이라이트 같은 부가 기능도 붙어있고 커스터마이즈도 편하다.
+ 문서도 잘되어있어서 Rehype Prism Plus 대신 써보았다. 

### Code Copy 버튼

요즘 Code Block 은 Copy 버튼이 붙어있다. 이를 구현하기 위해서 [claritydev blog](https://claritydev.net/blog/copy-to-clipboard-button-nextjs-mdx-rehype) 를 참고하여 구현하였다.

```unist-util-visit``` 을 이용해서 code 가 parse 되기 전에 원본 데이터를 따로 저장해둔다는 것이 핵심이다.

이렇게 저장한 데이터를 실질적으로 복사하는 부분을 ```<script>``` 를 통해서 구현했다. markdown 에도 적용하고 싶었기 때문에 react 를 쓸 수 없었기 때문이다.

### Latex

```MathJax``` 는 [NextJS hydration issue](https://github.com/remarkjs/remark-math/issues/80) 가 현재 블로그를 만드는 시점에 있다. 

markdown 은 처음부터 html 로 바꿔서 문제가 없는데 mdx 은 바뀐 결과물이 react 문법과 겹쳐서 그런가 문제가 생긴다.

그래서 mdx 는 ```katex``` 를 사용했다.



### TOC

커스터마이즈를 위해 직접 구현했다. 구현은 다음과 같이 하였다.

```unist-util-visit``` 을 이용해서 md/mdx 문서에서 헤더만 읽어서 ID 를 부여해준다. 그렇지 않으면 ```#id``` 로 스크롤 하기가 힘들어진다.

그리고 런타임에 헤더 목록을 가지고 TOC 를 구성한다. 이때 현재 저장된 원본 md/mdx 를 매번 파싱해서 헤더 목록을 구하고 있는데 너무 느리면 캐싱를 해야할지도 모르겠다.

현재 위치를 TOC 에 그리는 방법은 현재 윈도우에 있는 모든 헤더에 대해서 ```getBoundingClientRect()``` 를 사용해서 검색한다. 이는 스크롤이 움직일 때마다 호출해야하는데 계속 그러면 과부하가 있으므로 ```throttle()``` 함수를 따로 구현해서 일정 시간마다 호출이 가능하도록 했다.

```js
useEffect(()=> {
    const callback = ()=>{/*헤더를 순차대로 찾아서 화면에 나오면 그걸로 state 변경*/}

    callback();
    // 100ms 가 지나야지 callback 호출 가능하게 하는 래핑함수사용.
    const throttledCallback = throttle(callback, 100);
    
    window.addEventListener('scroll', throttledCallback);

    return () => {
      window.removeEventListener('scroll', throttledCallback)
    }
}, [])
```


## 구현시 에로사항

### Style

external css 가 scss 에서 ```@import``` 하면 적용이 안된다. ```<Link>``` 를 쓰던가 css 로 하면 된다. ```@import``` 가 순서대로 하나씩 로딩하는거라 시간이 걸린다고 하지만 유지관리 하기가 불편해서 그냥 css 로 했다.

### SEO Checker

![Blog Test Results](/images/blog/construct-0.png)

https://pagespeed.web.dev/

정적 블로그라 그런지 결과가 잘 나온다.