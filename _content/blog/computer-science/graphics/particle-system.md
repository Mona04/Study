---
title: Particle System
date: 2023-11-09
---

## 앞서서

Particle 은 Unity, Unreal 등 다양한 엔진에서 디자이너가 파라미터와 약간의 코딩으로 다양한 효과를 낼 수 있도록 제공되고 있다.
덕분에 어떠한 원리로 구현되는지 몰라도 편하게 사용할 수 있지만 나는 실제로 구현하면서 이를 탐구해보려고 한다.

## Particle System 이란?

파티클(Particles) 은 파티클 시스템에 의해 큰 숫자로 표시되고 이동되는 작고 단순한 이미지 또는 메시입니다. 각 파티클은 유체 또는 비정질 엔티티의 작은 부분을 나타내며, 모든 파티클의 효과가 전체 엔티티의 느낌을 만듭니다.[^def_particle]

이는 크게 다음과 같은 요소로 구현되어 있다.

1. Emit
    - Particle 하나하나의 LifeCycle 관리. 
2. Simulate
    - 위치, 색깔 등의 변경.
3. Rendering
    - 어떤 방법으로 Blending 할 것인가.


### Emit

### Simulate

### Rendering

#### Bitonic Sort

gpu 의 이점을 살려 bitonic sort. 

https://codingdog.tistory.com/entry/%EB%B0%94%EC%9D%B4%ED%86%A0%EB%8B%89-%EC%A0%95%EB%A0%AC-%EC%97%87%EA%B0%88%EB%A0%A4-%EA%B0%80%EB%A9%B4%EC%84%9C-sorting-%ED%95%9C%EB%8B%A4




## 참고자료

[rastertek dx11tut39](https://rastertek.com/dx11tut39.html)

[unreal4 particle doc](https://docs.unrealengine.com/4.27/ko/Resources/ContentExamples/EffectsGallery/1_B/)

[Advanced Visual Effects with DirectX 11: Compute-Based GPU Particle Systems](https://www.youtube.com/watch?v=fduKhsm3ID8)




[^def_particle]: [unity doc 5.6](https://docs.unity3d.com/560/Documentation/Manual/PartSysWhatIs.html)