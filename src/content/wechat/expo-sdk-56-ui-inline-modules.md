---
title: Expo 56 beta 来了，模版里终于敢塞原生 UI
description: Expo SDK 56 进 beta，Expo UI 标 stable，新模版默认 SwiftUI 与 Compose。inline modules 让 Kotlin、Swift 与业务同仓，Android 冷启动约快四成。
pubDatetime: 2026-06-03T00:00:00Z
tags: ["Expo", "React Native", "移动端", "Expo UI", "SDK 56"]
---

Expo SDK 56 开始 beta 了，底下是 React Native 0.85 和 React 19.2，beta 窗口大概两周。

我第一时间看的不是版本号，是 Expo UI 这次标成 stable。SwiftUI 和 Jetpack Compose 那套原生组件，新开的 create-expo-app 默认就有，Expo Go 也能直接跑。

以前做 RN 想蹭点真原生手感，多半还得拆 iOS、Android 两份文件，或者堆一圈社区库凑 UI。现在布局、按钮、BottomSheet 有 universal 组件；日期选择、分段控件这类，官方还做了换一行 import 就能迁的替代品，手感比 UIKit 硬包一层顺眼不少。

另一个我更想试的是 inline modules：Kotlin、Swift 可以跟业务代码放一块，prebuild 自动挂上。试个小原生能力不用先 create-expo-module 再单独开仓库。

官方 benchmark 说 Android 冷启动大约快 40%，iOS 原生模块调用也少绕了一层 ObjC++。我还没在业务项目里升，但模版敢默认塞原生 UI，说明 Expo 对「跨端但不全是 RN View」更有信心了。

你们手上的 RN 项目，是继续观望还是准备踩一脚？

#全栈成长之路
