---
title: "Blog Manual"
date: 2024-04-09
description: "블로그 사용 및 글 작성 시에 참고할 여러 기능에 대해서 정리."
tags: [blog]
---

## 검색

[lunrjs](https://lunrjs.com/guides/searching.html) 참고.

```js
// search one word.
idx.search('foo')
// search two word using 'or'.
idx.search('foo bar')
// wildcard
idx.search('foo*')
// field
idx.search('title:foo')
// boost
idx.search('foo^10 bar')
// fuzzy (내용중 숫자만큼 달라도 됨).
idx.search('foo~1')
// 반드시 있음/없음.
idx.search("+foo bar -baz")
```


## Code Highlight

[rehype-pretty](https://rehype-pretty.pages.dev/) 참고.

```js
\```cpp title="main.cpp" caption="caption" showLineNumbers{2} {1} {1,3-4}  "World" "Hello"2-4
#include <iostream>
using namespace std;
void main()
{
  int a = 0;
  cout << "Hello, World!" << endl;
  "Hello Hello Hello Hello"
}
\```
```

의 결과물은 다음과 같다.

```cpp title="main.cpp" caption="caption" showLineNumbers{2} {1} {1,3-4}  "World" "Hello"2-4
#include <iostream>
using namespace std;
void main()
{
  int a = 0;
  cout << "Hello, World!" << endl;
  "Hello Hello Hello Hello"
}
```

```js
`int a = 10;{:cpp}` is good
```

의 결과물은 다음과 같다. 

`int a = 10;{:cpp}` is good