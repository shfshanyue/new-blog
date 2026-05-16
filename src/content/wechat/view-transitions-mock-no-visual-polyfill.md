---
title: Safari 里也能把 startViewTransition 跑顺，这个 mock 只骗 Promise 不骗眼睛
description: Chrome Labs 的 View Transitions Mock 不画过渡动画，但在不支持原生 API 的浏览器里对齐 startViewTransition 返回的 Promise 形态，让你少写一半 if else。适合 SPA 路由做渐进增强，上线前仍要在 Safari 和 Firefox 跑路由回归，别把 polyfill 当长期标准写进规范文档。
pubDatetime: 2026-05-16T00:00:00Z
tags: ["Chrome", "View Transitions", "渐进增强", "Safari", "SPA"]
---

你有没有这种膈应：项目里想用 View Transition，Safari 不给面子，代码里就开始长两套路径，一边是原生，一边是降级，调试还容易脑裂。

Chrome Labs 有个思路挺狠的，叫 View Transitions Mock。它不给你画丝滑转场，它让你在没原生支持的浏览器里，也能拿到跟真机接近的 Promise 行为，DOM 切过去是瞬时的，但异步流程可以对齐。

我体感最大的好处是写路由切换时能少走一半分支，新人读代码也不会被兼容层绕晕。你不用为了兼容专门写一套假回调，再在支持的浏览器里套原生，整段逻辑更贴近单一路径。

当然也有坑，polyfill 终究不是标准本身，别把它当成长期规范背进团队文档。上线前照常在 Safari 和 Firefox 矩阵跑一遍路由回归，重点看历史栈、长列表滚动和 z 轴层级，别迷信行为一致四个字就跳过真机。

如果你也在做文档站或中小型 SPA 的过渡动效，值得把这个小玩具加到工具箱里试一圈。

#全栈成长之路
