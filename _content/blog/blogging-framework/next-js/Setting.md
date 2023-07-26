

## 기본설정

### Type Script

1. ```tsconfig.json```


2. ```global.d.ts```
  + scss 인식을 못하면 ```declare module '*.scss';``` 를 추가해보자.


### 주의사항

App Router 와 Page Router 에서 지원되는 기능도 다르고 공식 문서도 분리되어 있다. 예를들어 ```getStaticProps()```  같은 Data Fetch 작업은 Page Router 에서는 작동하지 않는다. 

style module 에서 클래스 이름에 ```-``` 가 들어간다면 ```MyModule["aaa-bbb"]``` 이렇게 직접 써야한다. gatsby 처럼 자동으로 ```MyModule.aaaBBB``` 로 만들어 주지 않는다.




## CMS

내가 필요한 기능은 markdown hot reload 와 검색기능을 위한 전체 데이터 최적화이다. 

결론부터 말하면 나는 그냥 [ContentLayer](https://www.contentlayer.dev/)를 쓰기로 했다. 
글을 쓰는 2023.07 에는 아직 베타버전이라 버그도 많지만 내가 필요한 기능이 모두 있고 nextjs 공식 사이트에서 지원한다고 적혀져 있어 이후 지원도 기대할 수 있기 때문이다.

이전에 내가 고려한 것은  [next remote watch](https://github.com/hashicorp/next-remote-watch) 였는데 next.js 12 버전까지 지원하고 이후는 소식이 뚝 끊겨있었다. 
그래서 내가 직접 파일변경 이벤트를 받아오고 nextjs hot reload api 를 호출하려고 했는데 이게 private api 라 숨겨져있었고 찾을 수 없었다. 
나중에 보니까 ```next/router``` 를 사용하던데 자세히는 모르겠다.


## github page deploy

