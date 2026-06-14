---
title: 花一天把 React 压到 9KB，这事靠谱吗
description: TanStack Start 作者 Tanner 用一天让 AI 投影出一个 7–9KB gzip 的 React 子集，跑在自己的站和 tanstack.com 上。他试了 preact/compat 在 React 19 下搞不定，改用 @tanstack/redact 插件按需开关 portal、suspense 等功能，不是替代 React，而是实验包体能压到什么程度。
pubDatetime: 2026-06-14T00:00:00Z
tags: ["React", "TanStack", "包体优化", "前端工程", "AI"]
---

TanStack 作者 Tanner 最近干了个有意思的事：他家 Router、Query 加起来都没 React 大，偏偏 React 单独就 60KB gzip，代码一行没写先胖一圈。

他先试 preact/compat，React 19 一过，use()、portal、Server Action 这些边缘 case 全是补丁套补丁，搞不动了。

换思路：React 公共 API 是稳定协议，react 包只是其中一种实现。他花一天让 AI 按规范生成了一个只保留 TanStack Start 真用得上的投影版 React。

gzip 核心 7KB 出头，full 预设 9KB 多，比完整版小八成。他自己的站和 tanstack.com 已经跑在上面了。

插件叫 @tanstack/redact，nano 或 full 预设，portal、suspense、hydration 还能按需开关。作者说了不是替代 React，但挺说明问题：AI 能按规范重生成代码的年代，你绑定的到底是协议还是某一个发行版？

#全栈成长之路
