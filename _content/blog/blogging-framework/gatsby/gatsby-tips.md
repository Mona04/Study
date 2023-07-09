---
title: Make Blog using Gatsby - 2
date: "2023-06-21 T22:12:03.284Z"
description: "Hello World"
---


## 구현관련 팁

### SSR

gatsby 에서 deploy 를 하면 산출물을 Server Side Rendering 을 하여 만들기 때문에 주의사항이 있다.

우선 ```window``` 와 ```document``` 전역 변수를 사용할 수 없다. browser 가 서버에는 없으니 당연한 일이다. 이를 처리하기 위해선 조건검사를 다음처럼 넣으면 된다.

```
export function isBrowser() : boolean { return typeof window !== "undefined"}
```

### Styling

css module 을 사용하려면 파일 이름을 ```[name].module.css``` 처럼 중간에 ```.module``` 이 필요하다.

webpack 의 tree shaking (산출물에서의 불필요한 코드 제거) 를 위해선 전체를 import 하지 않는 것이 권장된다.

```
import * as styles from 'style.module.css' // 
import { dark } from 'style.module.css'
```

