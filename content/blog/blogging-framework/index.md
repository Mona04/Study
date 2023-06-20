---
title: Set gatsby for blogging
date: "2015-05-01T22:12:03.284Z"
description: "Hello World"
---

## 기본세팅 방법

1. node.js 를 다운받는다.
2. node.js command prompt 에서 ```npm install -g gatsby-cli``` 로 gatsby 를 설치한다.
3. [Gatsby Starters](https://www.gatsbyjs.com/docs/starters/)
4. ```gatsby develop``` or ```gatsby build```
+ 포트번호를 바꾸는건 ```-p 4000``` 옵션으로 가능하다.

이때 ```gatsby ~``` 하고 바로 실행할 수도 있고 
```npm run [script name]``` 으로 지정된 스크립트를 실행할 수도 있다. 
스크립트는 ```package.json``` 의 ```scripts``` 에 있다.



### [host on github page](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/how-gatsby-works-with-github-pages/)

1. ```npm i gh-pages``` 로 깃허브 블로그 배포용 플러그인을 받는다.
2. ```gatsby-config.js``` 에서 ```pathPrefix: "[repository name]"``` 을 추가
3. ```package.json``` 에서 ``` "deploy": "gatsby build --prefix-paths && gh-pages -d public -b [branch name]"``` 스크립트 추가.


$$ \mathrm{A}$$

mathjax_support

## 주의사항

vscode 에서는 terminal 은 powershell 안될 때 cmd 로 하면 됨