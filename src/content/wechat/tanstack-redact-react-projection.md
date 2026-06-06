---
title: 一天搓出 9KB 版 React，这事我先不急着跟风
description: TanStack 的 Tanner Linsley 用 AI 花一天给 Start 做了套投影版 React，核心 gzip 约 7KB，全开也就 9KB 出头，对比 Vite 里正常打包的 React 客户端大概 60KB。Vite 插件 redact 可按 full 或 nano 预设裁剪功能位。他自己的站和 tanstack.com 已切上去跑，但明确说不替代 React，实验性质为主。
pubDatetime: 2026-06-06T00:00:00Z
tags: ["React", "TanStack", "包体优化", "前端工程", "AI 编程"]
---

Tanner Linsley 前些天干了一件事：用 AI 花一天，给 TanStack Start 搓了一套投影版 React。

他本来想换 Preact 省包体，结果发现 preact/compat 跟 React 19 对不齐，边边角角全是 shim。干脆换思路，只保留 Start 真用得上的 API，核心 gzip 大概 7KB，开满功能也就 9KB 出头，对比 Vite 里正常打包的 React 客户端大概 60KB。

更离谱的是速度，作者跑了几组 benchmark，有些场景渲染能快两三倍。他自己的博客和 tanstack.com 已经切上去跑了，700 多个测试也过了。

但他自己说得很清楚：这不是要替代 React，npm 包主要是实验性质，也不会塞进 TanStack Start 默认依赖里。我觉得这个态度挺对的，投影成本低了不等于你该到处 fork。

如果你项目本身就很重、又吃 concurrent 那一套，老老实实装完整 React 就行。但如果你心里清楚自己只用 hooks 加 SSR 那一小块，值得想想：是不是还在给每一位用户背一整车用不到的 plumbing。

#全栈成长之路
