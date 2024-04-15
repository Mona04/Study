---
title: How to calculate the CSS PPI from the device resolution
date: 2024-04-14
tags: [web, css]
---

## PPI

PPI(Pixel per Inch) 는 디스플레이의 1 inch 당 Pixel 이 몇개 있는지를 뜻한다.

PPI 계산법은 다음과 같다.

$$
\newcommand{\resX}[]{\text{가로픽셀갯수}}
\newcommand{\resY}[]{\text{세로픽셀갯수}}
\newcommand{\resI}[]{\text{화면인치}}
\cfrac{\sqrt{\resX^{2} + \resY^{2}}}{\resI}
$$

IPhone 12 Mini 를 예로 들어보자. 이 휴대폰은 5.4 인치 2340x1080 해상도를 가진다. 이를 위 수식에 넣어보면 477.260702109 가 나오고 다른 웹 계산기도 같은 결과를 가져온다. 실제로 이 폰은 476 PPI 를 가진다. 1 의 오차는 아마 소수점으로 생긴듯 하다.


## 논리적 픽셀

PPI 는 디스플레이에 따라 다르다. 다시말해 디스플레이에 따라 같은 픽셀 갯수라도 실제 물리적 길이가 다르다. 모니터의 5 Pixel 과 스마트폰의 5 Pixel 의 실제 길이가 다른 것처럼 말이다. 

여기서 문제가 생긴다. 우리가 Physical Pixel 의 갯수를 사용해서 프로그램의 레이아웃을 구성했다고 하자. 그러면 프로그램의 레이아웃이 같은 크기의 디스플레이라도 DPI 에 따라 달라진다. 같은 크기의 휴대폰이라도 PPI 에 따라 화면이 다를 수 있는 것이다. 

우리는 많은 경우 PPI 와 관계없이 디스플레이가 비슷한 레이아웃을 유지하기를 원한다. PPI 가 2배가 되었다고 글자의 물리적 길이가 반토막이 되기를 원하지 않는다. 적어도 웹에서는 그렇다.

위의 이유로 Physical Pixel 와 Logical Pixel 의 구분이 필요해졌다. Logical Pixel 로 작성한 프로그램의 1px 을 일정한 Physical Pixel 로 출력하는 것이 요지다. 이러한 비율을 DPR(Device Pixel Ratio) 라고 하며 수식은 다음과 같다. 

$$ \text{DPR} = \frac{\text{Num Physical Pixel}}{\text{Num Logical Pixel}}$$

DPR 은 맥락에 따라 다른 이름을 가지기도 하고, 서로 Logical Pixel 간의 비율을 말할 수도 있다. 또한 이 값은 장치에 따라 가변적일 수도 있다.


### CSS Pixel

그럼 예를 들어 보자. css 환경에서 IPhone 12 Mini 의 css pixel 는 몇일까?

```js
window.devicePixelRatio; // 3
window.outerWidth;       // 375
window.outerHeight;      // 812
```

위 코드를 통해 현재 휴대폰의 css pixel 갯수를 알 수 있다. 실제로 돌려보면 dpr 은 3, 해상도는 375x812 가 나오고 DPR 을 고려해보면 실제 해상도는 1125x2436 가 된다. 

그런데 IPhone 12 Mini 의 해상도는 1080x2340 이지 않은가? 왜 두 값이 다른 것일까? 

이는 IPhone 12/13 Mini 의 특징으로 1125x2436 으로 그린 결과를 1080x2340 으로 다시 축소하기 때문이다(정확한 매커니즘은 모름). 그래서 벡터 이미지인 폰트 마저도 흐릿하게 된다.[^reddit] 그래서 Scale Factor(3) 과 별개로 Native Scale Factor(2.88) 를 표기하기도 한다.[^iphone]  참고로 대부분의 기종은 이 둘이 차이가 없다.


## Reference Pixel

Logical Pixel 은 해상도가 다른 디스플레이에 대해서 같은 비율의 레이아웃을 구성하기 위해서 만들어졌다. 그런데 문제가 하나 더 있다. 거리가 먼 / 가까운 디스플레이에 대해서 Logical Pixel 을 구성하면 

Logical Pixel 인 CSS Pixel 은 96 PPI 를 기준으로 만들어졌다. 문제는 이를 매우 먼 / 가까운 디스플레이에 대해서 적용하면 화면의 전체 비율이 달라지게 된다는 것이다. 그렇다고 Logical Pixel 의 단위를 디스플레이마다 다르게 적용하는 것은 그 그렇기 때문에 실사용자가 관측하는 비율을 고정한 기준이 필요해졌고 그게 Reference Pixel 이다.

Reference Pixel 은 CSS Pixel 의 PPI 를 실제 길이가 아니라 디스플레이에 대한 시야각과 거리로 정의한다. 

 당시 많이 쓰이고 현재 CSS px 가 사용하는 96 PPI 는 시야각 0.0213 Degree 에서 28 Inch 거리의 디스플레이가 조건이라는 것이 요지이다. 휴대폰 환경에서는 


### DPI 를 정하는 방법

web div

### 예제

그럼 예를 들어 보자. css 환경에서 IPhone 12 Mini 의 css pixel 는 몇일까?

웹 페이지에 다음을 추가하면 css 에서 ```px``` 을 96 PPI 를 기준으로 간주하기 시작한다.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

$$ 
\newcommand{\weight}[]{\text{가중치}}
\begin{flalign}
& \weight = \frac{96}{476} = 0.20168067226 \\ \\

& 2340*\weight = 471.93 \\ \\ 

& 1080*\weight = 217.82 \\ \\
\end{flalign}
$$  

따라서 css Pixel 기준으로 해상도는 218x472 가 된다.


### 특징

Logical Pixel 은 대부분 여러 Physical Pixel 이 모여서 구성된다. 그래서 실제 렌더링 할 때는 두 단위 간의 변환이 필요하다.

벡터 그림을 그릴 때는 고해상도 디스플레이의 선명함을 잃지 않도록 내부에서 두 단위를 변환해서 그려준다. 그래서 고려할게 별로 없다.

그러나 이미지의 경우는 다르다. Logical Pixel 의 크기에 맞는 이미지를 그리게 되면 여러 Physical Pixel 이 하나의 색만 표현해서 고해상도 이미지가 낭비되기 때문이다. 하지만 보통은 사용자의 PPI 등을 고려해서 이미지를 전송하기 보단 2~4배의 이미지를 사용한다고 한다.

이를 위해서 css 에는 쿼리가 있긴 하다.

```css
@media (min-device-pixel-radio:3), (min-resolution:288dpi)
{
  --color-page-background: red;
}
```

## 번외


css 는 ```1in``` 를 96 개의 Logical Pixel 로 간주한다.[^css-doc] 그래서 실제 길이와 다를 수 있다.



  

  @media (-webkit-min-device-pixel-ratio: 2)//, (min-resolution:288dpi)
  {
    background-color: red;
  }

## 참고자료

[mdn mozilla: resolution](https://developer.mozilla.org/en-US/docs/Web/CSS/resolution)

[mdn mozilla: devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)

[web.dev:high-dpi](https://web.dev/articles/high-dpi?hl=ko)

[web.dev:device-pixel-radio](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/-webkit-device-pixel-ratio)

[apple dev: IPhone 12 Mini Spec](https://developer.apple.com/design/human-interface-guidelines/layout)


[^iphone]:[apple: IPhone 12 Mini Spec](https://www.ios-resolution.com/iphone-12-mini/)

[^reddit]:[reddit: IPhone1213 Mini Screen Res](https://www.reddit.com/r/iPhone12Mini/comments/rktxed/the_iphone_1213_minis_screen_resolution_is/)

[^js-dpr]:[mozilla: device pixel ratio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)

[^css-doc]:[css-doc](https://drafts.csswg.org/css-values/#absolute-lengths)

[^andriod-doc]:[andriod-doc](https://developer.android.com/training/multiscreen/screendensities?hl=ko)

http://inamidst.com/stuff/notes/csspx