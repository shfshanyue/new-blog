---
title: 一个下拉菜单，为什么要拖进来整个 React
description: Evil Martians 的 Pavel 用 Astro + React 赶完营销站后，几个月后迁到 Web Components + nanotags，JavaScript 少了 100KB。页面只有 4 块需要交互，React 运行时在这种场景像是白交的税。nanotags 核心 2.5KB，对比 React DOM 的 62KB gzip 差距明显。
pubDatetime: 2026-06-09T00:00:00Z
tags: ["前端", "性能优化", "Web Components", "Astro", "JavaScript"]
---

Evil Martians 有个哥们儿，之前用 Astro + React + Ark UI 赶工做了个营销站。能跑，deadline 也保住了，但 bundle 一直让他心里别扭。

几个月后他回去重构了：把下拉菜单、主题切换、侧栏弹窗这些交互，从 React 换到原生 Web Components。结果 JavaScript 少了 100KB，功能没丢，无障碍反而更稳了。

他原来的页面其实就 4 块需要 JS，剩下全是静态 HTML。React 那套虚拟 DOM 和运行时，在这种站上就是白交的税。

手写 Custom Elements 很痛苦，所以他把重复样板抽成了 nanotags 这个小库，核心不到 2.5KB，配 nanostores 整套也就 3KB 左右。对比 React + ReactDOM 光 gzip 就要 62KB，还没算 UI 库。

营销站、文档页、落地页，下次开新项目别条件反射 create-next-app 了。先问一句：你真的需要整棵协调树吗？

#全栈成长之路
