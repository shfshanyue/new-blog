---
title: Rolldown 喊到 1.0 了，我反而更不敢立刻上生产
description: Rolldown 宣布 1.0，主打兼容 Rollup 插件和大仓 tree-shaking，VoidZero 线路上 tsdown 也在往 Rolldown 靠。别被版本号带着跑，先用内部小包试插件兼容、产物体积和迁移成本，再决定要不要动主仓构建链。
pubDatetime: 2026-05-19T00:00:00Z
tags: ["构建工具", "Rolldown", "Rollup", "前端工程", "技术选型"]
---

Rolldown 到 1.0 了，我第一反应不是兴奋，是下意识开始算账：插件假设、CI 冷启动、同事上手成本，哪一条都能把「换个打包器」拖成两周会。

它主打兼容 Rollup 插件，又强调 shrink 和 tree-shaking，这对吃惯了 Rollup 心智的团队是加分项。旁边还有 tsdown 这种给库打产物、底层换 Rolldown 的路线，听起来像是先把库侧跑顺，再慢慢往应用侧渗透，比一上来就喊全家桶迁移靠谱一点。

我现在态度很朴素：主业务仓如果 Vite 或 Rsbuild 已经跑得稳，没必要因为霓虹灯换成 1.0 就立刻重写构建史。更现实的是挑一个内部小包先试 Rolldown 或 tsdown，专门盯三类事：有没有插件暗伤、产物体积到底省多少、本地 dev 和 watch 有没有体感回退。

真要扩到大型 monorepo，先看团队有没有精力啃迁移文档和边缘 case，比跟风发一句「我们已全面 Rolldown」重要得多。

#全栈成长之路
