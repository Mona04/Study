---
title: Make Blog using Gatsby - 2
date: "2023-06-21 T22:12:03.284Z"
description: "Hello World"
---


## 구현관련 특이사항

### Styling

css module 을 사용하려면 파일 이름을 ```[name].module.css``` 처럼 중간에 ```.module``` 이 필요하다.

webpack 의 tree shaking (산출물에서의 불필요한 코드 제거) 를 위해선 전체를 import 하지 않는 것이 권장된다.

```
import * as styles from 'style.module.css' // 
import { dark } from 'style.module.css'
```

