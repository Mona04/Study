---
title: What is PPI, Logical Pixel and Reference Pixel?
description: The concepts of PPI, logical pixel, and reference pixel, and how they are related, with an example of the iPhone 12 Mini.
date: 2024-04-14
tags: [web, css]
---

## Concept

### PPI

PPI(Pixel per Inch) 는 디스플레이의 1 inch 당 Pixel 이 몇개 있는지를 뜻하는 Pixel Density 에 대한 단위이다.

PPI 계산법은 다음과 같다.

$$
\newcommand{\resX}[]{\text{가로픽셀갯수}}
\newcommand{\resY}[]{\text{세로픽셀갯수}}
\newcommand{\resI}[]{\text{화면인치}}
\cfrac{\sqrt{\resX^{2} + \resY^{2}}}{\resI}
$$

iPhone 12 Mini 를 예로 들어보자. 이 휴대폰은 5.4 인치 2340x1080 해상도를 가진다. 이를 위 수식에 넣어보면 477.260702109 가 나오고 다른 웹 계산기도 같은 결과를 가져온다. 실제로 이 기기는 476 PPI 를 가진다. 1 의 오차는 아마 소수점으로 생긴듯 하다.


### Logical Pixel

PPI 는 디스플레이에 따라 다르다. 다시말해 디스플레이에 따라 같은 픽셀 갯수라도 실제 물리적 길이가 다르다. 모니터의 5 Pixel 과 스마트폰의 5 Pixel 의 실제 길이가 다른 것처럼 말이다. 

여기서 문제가 생긴다. 우리가 Physical Pixel 의 갯수를 사용해서 프로그램의 레이아웃을 구성했다고 하자. 그러면 같은 크기의 디스플레이라도 프로그램의 레이아웃이 PPI 에 따라 달라진다. 같은 크기의 휴대폰이라도 PPI 에 따라 화면 구성이 달라지는 것이다.

우리는 많은 경우 PPI 와 관계없이 디스플레이가 비슷한 레이아웃을 유지하기를 원한다. PPI 가 2배가 되었다고 글자의 물리적 길이가 반토막이 되기를 원하지 않는다. 

위의 이유로 Physical Pixel 와 Logical Pixel 의 구분이 필요해졌다. Logical Pixel 로 작성한 프로그램의 1px 을 일정한 Physical Pixel 로 출력하는 것이 요지다. 이러한 비율을 DPR(Device Pixel Ratio) 라고 하며 수식은 다음과 같다. 

$$ \text{DPR} = \frac{\text{Num Physical Pixel}}{\text{Num Logical Pixel}}$$

DPR 은 맥락에 따라 다른 이름을 가지기도 하고, Logical Pixel 간의 비율을 말할 수도 있다. 또한 이 값은 장치에 따라 가변적일 수도 있고 런타임에 값이 바뀔 수도 있다. 중요한건 Pixel 종류 간의 비율이다.


### Reference Pixel

위에서 살펴보았듯 DPR 을 통해서 물리적 길이는 같지만 픽셀 밀도가 다른 디스플레이에 간의 일관적인 레이아웃을 구성할 수 있다. 그런데 문제가 하나 더 있다. 

예를 들어 보자. 모니터에서 글자크기가 0.5 Inch 라고 할 때 휴대폰에서도 글자가 0.5 Inch 일 필요가 있을까? 그렇지 않다. 휴대폰은 모니터보다 더 작고 사용자와 더 가깝기 때문에 글자크기가 더 작아도 된다.

이처럼 실 사용자가 일관적인 경험을 하기 위해서는 또 다른 기준이 필요하고 이를 위해 만들어진 것이 Reference Pixel 이다.

CSS 에서는 0.0213 Degree 에서 28 Inch 거리의 디스플레이가 96 PPI 를 갖도록 Reference Pixel 을 두었다. 모바일 환경에서는 대략 18 Inch 라고 간주하는데 삼각비를 이용하면 $28\times96 \div 18 \simeq 150$ PPI 임을 알 수 있다. [^refpix]



## 예제

그럼 예를 들어 보자. css 환경에서 iPhone 12 Mini 의 css pixel 는 몇일까?

```js
window.devicePixelRatio; // 3
window.outerWidth;       // 375
window.outerHeight;      // 812
```

위 코드를 통해 현재 브라우저의 DPR 및 CSS Pixel 해상도를 알 수 있다. 실제로 돌려보면 DPR 은 3, 해상도는 375x812 가 나온다.

그런데 뭔가 이상하다. iPhone 12 Mini 의 해상도는 1080x2340 이지 않은가? 위에서 얻은 CSS Pixel 해상도에 DPR 을 곱해서 구한 해상도는 1125x2436 이다. 왜 두 값이 다른 것일까? 

이는 iPhone 12/13 Mini 의 특징으로 1125x2436 으로 그린 결과를 1080x2340 으로 다시 축소하기 때문이다(정확한 매커니즘은 모름). 그래서 벡터 이미지인 폰트 마저도 흐릿하게 된다.[^reddit] 그래서 Scale Factor(3) 와 별개로 Native Scale Factor(2.88) 를 표기하기도 한다.[^iphone] 참고로 대부분의 기종은 이 둘이 차이가 없고 정수라서 화면이 선명하다.

또한 모바일 환경에서의 Reference Pixel 이 대략 150 PPI 임을 고려하면 기기의 476 PPI 를 150 으로 나눈 값이 이 기기의 3 DPR 과 비슷함을 알 수 있다.




## Web 에서 고려사항

Logical Pixel 은 대부분 여러 Physical Pixel 이 모여서 구성된다.

벡터 그림을 그릴 때는 고해상도 디스플레이의 선명함을 잃지 않도록 내부에서 두 단위를 변환해서 그려준다. 그래서 고려할게 별로 없다.

그러나 이미지의 경우는 다르다. Logical Pixel 의 크기에 맞는 이미지를 그리게 되면 여러 Physical Pixel 이 하나의 색만 표현해서 고해상도 이미지가 낭비되기 때문이다. 하지만 보통은 사용자의 PPI 등을 고려해서 이미지를 전송하기 보단 2~4배의 이미지를 사용한다고 한다.

물론 PPI 에 맞춰서 이미지를 바꿀 수도 있다. 이를 위한 미디어 쿼리의 예로 다음이 있다.

```css
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution:288dpi)
{
  background-color: red;
}
```




  

&nbsp;

## 참고자료 

[mdn mozilla: resolution](https://developer.mozilla.org/en-US/docs/Web/CSS/resolution)

[mdn mozilla: devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio)


[web.dev:device-pixel-radio](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/-webkit-device-pixel-ratio)

[apple dev: IPhone 12 Mini Spec](https://developer.apple.com/design/human-interface-guidelines/layout)

[csswg](https://drafts.csswg.org/css-values/#absolute-lengths)

http://inamidst.com/stuff/notes/csspx


[^iphone]:[apple: IPhone 12 Mini Spec](https://www.ios-resolution.com/iphone-12-mini/)

[^reddit]:[reddit: IPhone1213 Mini Screen Res](https://www.reddit.com/r/iPhone12Mini/comments/rktxed/the_iphone_1213_minis_screen_resolution_is/)

[^refpix]:[web.dev:high-dpi](https://web.dev/articles/high-dpi?hl=ko)


