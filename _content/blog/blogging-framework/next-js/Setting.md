

## 

## github page deploy

### 주의사항

App Router 와 Page Router 에서 지원되는 기능도 다르고 공식 문서도 분리되어 있다. 예를들어 ```getStaticProps()```  같은 Data Fetch 작업은 Page Router 에서는 작동하지 않는다. 

style module 에서 클래스 이름에 ```-``` 가 들어간다면 ```MyModule["aaa-bbb"]``` 이렇게 직접 써야한다. gatsby 처럼 자동으로 ```MyModule.aaaBBB``` 로 만들어 주지 않는다.

