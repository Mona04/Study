---
title: VocaNote
description: 일본어를 공부하려는데 단어 외우기 빡세서 만드는 앱.
date: 2024-05-23
tags: [flutter]
thumbnail: /portfolio/memorizer.png
---

## 개발동기

요즘 JLPT N2 를 준비하는데 순탄하지가 않다.
단어량은 많은데 한자에 친숙하지 않아서 외우기가 쉽지 않다.

나는 이럴 때 단어 사이에 연결고리를 만들어서 단어를 외운다. 
자세히 말하자면 경선식 암기법이 쉽게 기억되는 연상방법을 기억하듯 각 단어들 간의 공통점과 차이점을 이용해 단어들을 구조화하여 암기한다. 
개인적으로 이편이 더 재미있고 기억이 오래간다.

다만 단어가 많을 수록 구조화한 것을 메모하지 않으면 금세 까먹는다. 
그래서 어릴 땐 노트에 수작업을 하며 단어를 외웠다. 
하지만 난 이제 컴퓨터를 활용할 능력이 있다.

그래서 어플을 하나 만들기로 했다.


## 요구사항

+ 단어장
  - [x] 어휘를 저장, 전시, 삭제 할 수 있어야 한다.
  - [x] 한자를 눌렀을 때 관련 한자들을 검색하여 전시할 수 있어야 한다.
  - [x] 단어에 태그를 붙여서 빠른 검색을 가능하게 해야한다. 암기 중에 태그를 통해 관련 단어를 쉽게 볼 수 있어야 한다.
  - [x] 여러 어휘들의 속성을 한번에 바꿀 수 있어야한다.
+ 암기 테스트
  - [x] 한자 쓰기 / 뜻 쓰기 모드를 구현해야한다.
  - [x] (특히 문장에서) 빈칸 테스트를 할 수 있어야한다. 빈칸은 사용자가 등록 가능해야한다.
  - [x] 추가한 날짜를 사용해 일정 기간에 추가한 어휘들을 모아 테스트가 가능해야한다.
  - [x] 많이 틀린 어휘 순으로 테스트가 가능해야한다.
  - [x] 키워드로 검색한 결과에 대해 테스트가 가능해야한다.
+ 기능
  - [x] 복사 버튼으로 복사를 편하게 해야한다.
  - [x] 단어 터치 시 사전 이동 기능.
  - [x] 단어 추가 시 빠른 완성 기능.


## 배포 삽질

앱 아이콘으로 적절한게 생각나지 않아서 [AutoDraw](https://www.autodraw.com/) 으로 간단히 그려서 [AppIcon](https://www.appicon.co/) 으로　ios　에 맞게 생성했다.

시뮬레이터 목록 중에 5.5 해상도 환경이 없었다. 
[찾아보니](https://forums.developer.apple.com/forums/thread/719822) SE 3세대 환경에서 스크린샷을 찍고 리사이즈를 하라는 답변이 추천이 많아 해보았다.



## Install

[appstore](https://apps.apple.com/us/app/vocalink/id6615091722)