---
title: Set gatsby for blogging
date: "2023-06-21 T22:12:03.284Z"
description: "Hello World"
---


## 기본세팅 방법

- **For most developers, we recommend starting with our [in-depth tutorial for creating a site with Gatsby](https://www.gatsbyjs.com/docs/tutorial/getting-started/).** It starts with zero assumptions about your level of ability and walks through every step of the process.

- **To dive straight into code samples, head [to our documentation](https://www.gatsbyjs.com/docs/).** In particular, check out the _Guides_, _API Reference_, and _Advanced Tutorials_ sections in the sidebar.


1. node.js 를 다운받는다.
2. node.js command prompt 에서 ```npm install -g gatsby-cli``` 로 gatsby 를 설치한다.
3. ```gatsby new [SITE_DIRECTORY] [URL_OF_STARTER_GIT_REPO]```.
    + ```SITE_DIRECtORY``` 로 Starter 를 보통 넣는다. [Gatsby Starters](https://www.gatsbyjs.com/docs/starters/) 를 참고하자.
    + ```gatsby new gatsby-starter-blog [URL_OF_STARTER_GIT_REPO]``` 를 많이 하더라.
4. ```npm run develop``` 으로 실시간 디버그가 가능하게 한다.
5. 블로깅한다.
6. ```npm run deploy``` 로 배포한다.

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


$$ \mathrm{A}$$

mathjax_support

## 주의사항





# README 에서 따온 기본설명


## 🚀 Quick start

1.  **Create a Gatsby site.**

    Use the Gatsby CLI ([install instructions](https://www.gatsbyjs.com/docs/tutorial/getting-started/part-0/#gatsby-cli)) to create a new site, specifying the blog starter.

    ```shell
    # create a new Gatsby site using the blog starter
    gatsby new my-blog-starter https://github.com/gatsbyjs/gatsby-starter-blog
    ```

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-blog-starter/
    gatsby develop
    ```

1.  **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    Note: You'll also see a second link: `http://localhost:8000/___graphql`. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby Tutorial](https://www.gatsbyjs.com/docs/tutorial/getting-started/part-4/#use-graphiql-to-explore-the-data-layer-and-write-graphql-queries).

    Open the `my-blog-starter` directory in your code editor of choice and edit `src/pages/index.js`. Save your changes and the browser will update in real time!

## 🚀 Quick start (Netlify)

Deploy this starter with one click on [Netlify](https://app.netlify.com/signup):

[<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" />](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-blog)

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in a typical Gatsby project.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── LICENSE
    ├── package.json
    └── README.md

1.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

1.  **`/src`**: This directory will contain all of the code related to what you will see on the front-end of your site (what you see in the browser) such as your site header or a page template. `src` is a convention for “source code”.

1.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

1.  **`gatsby-browser.js`**: This file is where Gatsby expects to find any usage of the [Gatsby browser APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/) (if any). These allow customization/extension of default Gatsby settings affecting the browser.

1.  **`gatsby-config.js`**: This is the main configuration file for a Gatsby site. This is where you can specify information about your site (metadata) like the site title and description, which Gatsby plugins you’d like to include, etc. (Check out the [config docs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/) for more detail).

1.  **`gatsby-node.js`**: This file is where Gatsby expects to find any usage of the [Gatsby Node APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/) (if any). These allow customization/extension of default Gatsby settings affecting pieces of the site build process.

1.  **`gatsby-ssr.js`**: This file is where Gatsby expects to find any usage of the [Gatsby server-side rendering APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/) (if any). These allow customization of default Gatsby settings affecting server-side rendering.

1.  **`LICENSE`**: This Gatsby starter is licensed under the 0BSD license. This means that you can see this file as a placeholder and replace it with your own license.

1.  **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

1.  **`README.md`**: A text file containing useful reference information about your project.
