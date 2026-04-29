---
title: 装完 tsgo 我先看了眼 CI，没敢直接换主分支
description: TypeScript 7 Beta 把类型检查用 Go 重写了一版，预览包叫 native-preview，命令行入口是 tsgo，跟以前 npx tsc --noEmit 差不多用法。大仓库可能省不少分钟，但并行度吃内存。建议单独 job 或分支对比耗时，还在 TS 5 的队先别一口气跳到 7，中间 6 的默认项会硌脚。
pubDatetime: 2026-04-29T00:00:00Z
tags: ["TypeScript", "tsgo", "CI", "构建优化", "工具链"]
---

你最近要是刷到有人说 TypeScript 编译器换 Go 重写了，说的就是 7 这条 beta。

尝鲜步骤不玄乎：开发依赖里加 native-preview 的 beta 包，终端里跑 npx tsgo --noEmit，跟以前 tsc 那套差不多，只是 CLI 叫 tsgo。快不快要看仓库体量，类型多的项目省下来的分钟数才明显；机器内存紧就别把并行 checker 拉满，先用单线程把语义跑通再慢慢调参数。

对你业务代码几乎不用改写法，动的是本地等待条和 CI 墙上那几分钟。别一上来就换掉整条流水线，单独开条分支或单独加一个 job，同一套代码跑一遍对比耗时就够了。还在 TypeScript 5 的队建议先补课 6 的默认配置，7 是叠在上面的，strict 和 types 那些默认值一次性跨两级很容易被硌一下。

真有甜头再排升级，没甜头就当刷新认知也行。

#全栈成长之路
