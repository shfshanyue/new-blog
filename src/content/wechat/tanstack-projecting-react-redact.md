---
title: React 整包 60KB，你页面可能只要 9KB
description: TanStack 的 Tanner 用一天做出 React 公 API 投影，gzip 从 60KB 级压到 7–9KB，已在个人站和 tanstack.com 跑。Vite 插件 redact 有 full、nano 两档按需开功能位，不替代 React，RSC 重页 LCP 仍有坑。
pubDatetime: 2026-06-07T00:00:00Z
tags: ["React", "TanStack", "包体积", "前端工程", "Vite"]
---

你看到 react-dom 整包 60KB gzip，心里有没有过一句：我页面真需要这么多吗？

TanStack 的 Tanner 最近花了大概一天，用规范驱动的提示工程，给 TanStack Start 生成了一个 React 公 API 投影。核心 gzip 大概 7 到 9KB，比完整 react-dom/client 小一个数量级，个人站和 tanstack.com 已经在用了。

他自己也试过 preact/compat，React 19 语义、RSC、错误边界这些地方摩擦累积起来，干脆走投影路线。配套 Vite 插件 redact，full 接近完整 React，nano 从最小核按需开 portal、context、suspense 这些位。

他刻意没营销成 React 替代，npm 包偏实验和学习。RSC 重页面的 LCP 还有已知回归风险，生产上得自己测。

如果你关心包体、边缘渲染，或者 AI 时代改一次重新生成的成本，这套把发行版和真实形状解耦的思路值得看一眼。

#全栈成长之路
