---
title: React 全家桶 60KB，我只想要 9KB 行不行
description: TanStack Start 的 Tanner 花约一天，用 redact 把 React 公 API 投影成约 7～9KB gzip 运行时，对比 react-dom/client 的 ~60KB。不走 preact/compat，而是 full/nano 预设按位开关能力；实验性质，RSC 重页 LCP 仍有坑。
pubDatetime: 2026-06-08T00:00:00Z
tags: ["React", "TanStack", "包体积", "Vite", "前端工程"]
---

TanStack Start 那边有个挺有意思的事：Tanner 用大概一天，靠规范驱动的提示工程，把 React 公共 API 投影成了一个约 7～9KB gzip 的运行时。完整 react-dom/client，差不多是 60KB 这个量级。

他没走 preact/compat 那条路。React 19 语义、RSC、错误边界叠上去，兼容层会越来越厚，磨磨蹭蹭最后还是带着一坨你用不到的 API。

解法是一个叫 redact 的 Vite 插件，preset 从 full 到 nano，portal、suspense、hydration 按位打开。你觉得仪表盘根本不需要 portal，就别把 portal 打进包里。

作者也说了，这不是要替代 React，npm 包主要拿来实验。但对在乎包体、边缘渲染的人来说，发行版和你的真实形状拆开，这事儿本身就值得看看。RSC 重页面上 LCP 还有回归风险，生产别闭眼冲。

#全栈成长之路
