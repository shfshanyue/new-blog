---
title: 生产上的 Next 这周升了吗
description: 五月 Next 和 React 出了协同安全发布，15.5.18、16.2.6 以及 React 19 补丁线要成套升，停在 15.5.17 这种中间态照样中招。RSC 可被 DoS（CVE-2026-23870），middleware 有 segment-prefetch 绕过，还有 Cache Components 连接耗尽和 RSC 缓存投毒。别只改 next 一个包，react、react-dom、react-server-dom 按官方矩阵对齐，升完在 staging 把登录、动态路由、next/image 和带 prefetch 的列表页各点一遍。
pubDatetime: 2026-05-28T00:00:00Z
tags: ["Next.js", "React", "安全", "升级", "RSC"]
---

你们生产上的 Next 这周升了吗？

我这边刚把几个还在 15.5 线上的项目对了一遍，五月这波不是小修小补，是 Next 和 React 一起出的协同安全发布。光 RSC 那条 DoS（CVE-2026-23870）就够你半夜被叫醒了，更别说 middleware 绕过、WebSocket 升级 SSRF、图片优化接口被打满这些 GHSA。

很多人习惯只 bump 一个 next 版本就完事，这次不行。react、react-dom，还有你实际在用的 react-server-dom-webpack 或 turbopack 那条线，得按官方矩阵对齐，少升一个包等于白升。15.5.18 和 16.2.6 两条线都打了，你停在 15.5.17 这种中间态，照样中招。

公告里高危项一口气列了七八条，从 segment-prefetch 绕过 middleware，到 Cache Components 连接耗尽，再到 RSC 响应缓存投毒。看着像堆 CVE 编号，本质都是：框架帮你挡的那层壳破了，业务代码再干净也救不了。

我自己会按这个顺序来：先看 lockfile 里 Next 是 15 还是 16 分支，再一次性把 React 全家桶拉到公告要求的补丁号，最后在 staging 把登录、动态路由、next/image、带 prefetch 的列表页各点一遍。middleware 和 i18n 叠在一起的项目尤其别偷懒。

别拖到下个迭代，这种补丁拖一周，心里都不踏实。

#全栈成长之路
