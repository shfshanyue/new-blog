---
title: 五月这波 Next 安全更新，别拖到下周
description: 五月 Next.js 与 React 协调安全发布，CVE-2026-23870 等 RSC DoS，以及中间件授权绕过、WebSocket SSRF、CSP nonce XSS 等需尽快升级。15.5.17 升到 15.5.18、16.2.5 升到 16.2.6，WAF 拦不住，App Router 项目建议当周打补丁并在预发回归。
pubDatetime: 2026-05-27T00:00:00Z
tags: ["Next.js", "React", "安全", "RSC", "升级"]
---

五月 Next 和 React 一起发了协调安全公告，不是小修小补那种，我看完第一反应是查自己项目 lock 文件。

核心是 RSC 相关的 CVE-2026-23870，DoS 攻击面。Next 这边还单独列出了好几条：中间件和 segment prefetch 授权绕过、动态路由参数注入、WebSocket SSRF、缓存组件和图片 API 的拒绝服务，甚至连 CSP nonce 场景下都有 XSS 风险。你平时觉得「鉴权写好了就稳了」的地方，这次有好几个被点名。

官方给的升级路径很直白：next 15.5.17 及以下升到 15.5.18，16.2.5 及以下升到 16.2.6，react-server-dom 那条 patch 线也要一起升，别只升 next 就以为完事。公告里写清楚了，这些逻辑问题靠 WAF 拦不住。

要是你们还在用 App Router、PPR、Cache Components，中间件做鉴权，我建议这周就排升级，别往后拖。第三方 i18n 或自定义缓存键的项目，prefetch 和 next/image 也要额外看一眼。升完在预发把 middleware、动态路由、WebSocket 代理这几条路径跑一遍，比等着线上告警靠谱。

#全栈成长之路
