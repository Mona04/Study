---
title: Particle System
date: 2023-11-09
---

## Particle System 의 큰 요소

1. Emitter. 
    - 파티클 하나 하나를 생성하고 삭제하는 것을 관리해야함.

2. Movement.
    - 파티클 하나하나를 적절하게 이동시켜야함.
    - 물리충돌도 가능해야함.

3. Collision.

3. Sorting
    - 성능상의 이슈로 앞에서부터 그려서 culling 이 가능한게 좋음.


4. Image
    - 파티클마다 사람에게 이미지를 보여줘야함.
    - 보통의 경우 삼각형을 언제나 카메라의 정면 방향으로 그림(빌보드).


## Why do we need to sort?


### Bitonic Sort

gpu 의 이점을 살려 bitonic sort. 

https://codingdog.tistory.com/entry/%EB%B0%94%EC%9D%B4%ED%86%A0%EB%8B%89-%EC%A0%95%EB%A0%AC-%EC%97%87%EA%B0%88%EB%A0%A4-%EA%B0%80%EB%A9%B4%EC%84%9C-sorting-%ED%95%9C%EB%8B%A4

## 참고자료

[rastertek dx11tut39](https://rastertek.com/dx11tut39.html)

[unreal4 particle doc](https://docs.unrealengine.com/4.27/ko/Resources/ContentExamples/EffectsGallery/1_B/)

[Advanced Visual Effects with DirectX 11: Compute-Based GPU Particle Systems](https://www.youtube.com/watch?v=fduKhsm3ID8)