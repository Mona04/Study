

## 기본설정

### Type Script

1. ```tsconfig.json```
  + gatsby 샘플 프로젝트에서 ```tsconfig.json``` 을 제공하니 [참고](https://github.com/gatsbyjs/gatsby/blob/master/starters/gatsby-starter-minimal-ts/tsconfig.json).

2. ```global.d.ts```
  + scss 인식을 못하면 ```declare module '*.scss';``` 를 추가해보자.




## github page deploy

### 주의사항

App Router 와 Page Router 에서 지원되는 기능도 다르고 공식 문서도 분리되어 있다. 예를들어 ```getStaticProps()```  같은 Data Fetch 작업은 Page Router 에서는 작동하지 않는다. 

style module 에서 클래스 이름에 ```-``` 가 들어간다면 ```MyModule["aaa-bbb"]``` 이렇게 직접 써야한다. gatsby 처럼 자동으로 ```MyModule.aaaBBB``` 로 만들어 주지 않는다.

