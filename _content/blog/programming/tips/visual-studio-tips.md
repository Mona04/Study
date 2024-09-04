---
title: Visual Studio Tips
description: Useful Visual Studio Tips.
date: 2024-05-28
tags: [tip]
---

### Always Do Build Event

build event 가 있는 프로젝트의 .csproj 를 텍스트 에디터로 연다.

```xml title="yourproj.csproj"
<PropertyGroup>
...
    <DisableFastUpToDateCheck>true</DisableFastUpToDateCheck>
</PropertyGroup>
```

 그리고 PropertyGroup 항목에 위처럼 추가한다.