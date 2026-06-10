---
title: Rolldown 1.0 稳定了，Rollup 插件不用扔
description: VoidZero 宣布 Rolldown 1.0 正式稳定，主打接近 esbuild 的打包速度，同时兼容 Rollup 插件生态，大型仓库的 shrink 和 tree-shaking 也是重点。旗下 tsdown 已切到 Rolldown 打库产物。打 npm 包、发内部组件库这类场景最吃构建速度。如果你在评估从 Rollup 或 webpack 迁出去，可以顺手对照 Vite 后面的演进路线。
pubDatetime: 2026-06-10T00:00:00Z
tags: ["前端工程", "Rolldown", "构建工具", "Vite", "Rollup"]
---

Rolldown 1.0 稳定了。

如果你还在用 Rollup 打库，或者 monorepo 打包慢到怀疑人生，这个消息值得你扫一眼。前端打包这条线这两年一直在往 Rust 靠，esbuild、Turbopack、Rolldown 各走各路，但 Rolldown 这次把稳定两个字写进了版本号，不是那种永远在 beta 的玩具。

VoidZero 喊的是接近 esbuild 的打包速度，重点是没把 Rollup 插件生态扔掉，很多现有插件还能接着用。大型仓库的 shrink 和 tree-shaking 才是主战场，不是只在 hello world 上跑个 benchmark 就吹上天。

同生态的 tsdown 已经拿 Rolldown 来打库产物了，说明不是 PPT 产品。你打 npm 包、发内部组件库，这类场景往往最吃构建速度和产物体积，Rolldown 就是冲着这块来的。

我自己不会明天就把 webpack 全拆了，老项目也没必要为了追新硬迁。但如果你在认真评估迁构建链，可以把它和 Vite 后面那套路线放一起对照看。别等到 CI 又要等十分钟，才想起来当初为什么没动。

#全栈成长之路
