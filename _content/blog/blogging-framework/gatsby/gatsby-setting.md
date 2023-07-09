---
title: Make Blog using Gatsby - 1 
date: "2023-06-21 T22:12:03.284Z"
description: "Hello World"
---


## 기본세팅 방법

1. node.js 를 다운받는다.
2. node.js command prompt 에서 ```npm install -g gatsby-cli``` 로 gatsby 를 설치한다.
3. ```gatsby new [SITE_DIRECTORY] [URL_OF_STARTER_GIT_REPO]```.
    + ```SITE_DIRECTORY``` 로 Starter 를 보통 넣는다. [Gatsby Starters](https://www.gatsbyjs.com/docs/starters/) 를 참고하자.
    + ```gatsby new gatsby-starter-blog [URL_OF_STARTER_GIT_REPO]``` 를 많이 하더라.
4. bloging
    1. ```npm run develop``` 으로 실시간 디버그가 가능하게 한다.
    2. ```npm run deploy``` 로 배포한다.



### Command 

vscode 에서는 terminal 은 powershell 에서 안되면 cmd 로 하면 된다.

```gatsby ~``` 하고 바로 실행할 수도 있고 
```npm run [script name]``` 으로 지정된 스크립트를 실행할 수도 있다. 
플러그인 관련 커맨드도 실행해야하므로 보통 스크립트를 쓴다.
스크립트는 ```package.json``` 의 ```scripts``` 에 있다.

포트번호를 바꾸는건 ```-p 4000``` 옵션으로 가능하다.



### [host on github page](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/how-gatsby-works-with-github-pages/)

1. ```npm i gh-pages``` 로 깃허브 블로그 배포용 플러그인을 받는다.
2. ```gatsby-config.js``` 에서 ```pathPrefix: "[repository name]"``` 을 추가
3. ```package.json``` 에서 ``` "deploy": "gatsby build --prefix-paths && gh-pages -d public -b [branch name]"``` 스크립트 추가.



### [Custom Webpack Config](https://www.gatsbyjs.com/docs/how-to/custom-configuration/add-custom-webpack-config/)

```
// gatsby-node.js
/**
 * @type {import('gatsby').GatsbyNode['onCreateWebpackConfig']}
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  console.log(path.resolve(__dirname, "src"));
  actions.setWebpackConfig({
    resolve: {
      modules: ["node_modules", path.resolve(__dirname, "src"), ],
    },
  })
}

```

기본 참조 디렉토리는 위처럼 첨부할 수 있다. ```node_modules``` 는 gatsby 의 기본 설정으로 되어있는 거라 빼놓으면 안된다. 이렇게 해놓으면 ```./../test.css``` 를 ```test.css``` 로 대체할 수 있다.


### Type Script

gatsby 5.0 기준으로 기본적으로 제공한다. 그런데 vscode 에서 인식을 못해서 몇가지 설정을 만져줘야한다. 

1. ```tsconfig.json```
  + gatsby 샘플 프로젝트에서 ```tsconfig.json``` 을 제공하니 [참고](https://github.com/gatsbyjs/gatsby/blob/master/starters/gatsby-starter-minimal-ts/tsconfig.json).

2. ```global.d.ts```
  + scss 인식을 못하면 ```declare module '*.scss';``` 를 추가해보자.








## 자주 찾을 공식 문서

[gatsby-project-structure](https://www.gatsbyjs.com/docs/reference/gatsby-project-structure/)

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/docs/tutorial/getting-started/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.



