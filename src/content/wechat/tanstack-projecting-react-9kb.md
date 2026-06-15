---
title: TanStack 把 React 砍到 9KB，还敢上生产？
description: 完整 react-dom gzip 大概六十多 KB，TanStack 的 Tanner Linsley 用规范驱动的提示词花了一天，给 Start 生成了一份只保留真用到 API 的投影版 React，核心 7 到 9 KB，已在 tanstack.com 跑着。配套 Vite 插件 redact 有 full 和 nano 预设，但重 RSC 页面 LCP 还有已知回归。
pubDatetime: 2026-06-15T00:00:00Z
tags: ["React", "TanStack", "包体优化", "前端工程", "Vite"]
---

你项目里 import 的 react-dom，gzip 下来大概六十多 KB，但你可能根本用不到里面七成 API。

TanStack 的 Tanner Linsley 干了一件事：用规范驱动的提示词，花了一天，给 TanStack Start 生成了一份投影版 React，只保留真用到的子集。核心包 gzip 大概 7 到 9 KB，已经在他个人站和 tanstack.com 跑着了。

为啥不直接换 preact/compat？作者在文章里把摩擦点说得挺明白，React 19 语义、RSC、错误边界这些地方，兼容层累计起来并不省事。

配套的 Vite 插件叫 redact，有 full 和 nano 两档预设，还能按需开关 suspense、hydration 这些能力位。说白了就是把项目真实用到的 React 形状从官方大包里切出来，发行版和实际需求解耦。

当然他也说得很清楚，这不是要替代 React，npm 包更像是实验品。重 RSC 页面 LCP 还有已知回归，生产前要掂量。

要是我，会先拿边缘页面试水，别上来就换全家桶。

#全栈成长之路
