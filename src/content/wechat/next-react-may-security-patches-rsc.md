---
title: RSC 这个洞别指望靠 WAF 糊弄过去
description: 五月这轮 Next 和 React 补丁一口气修了 RSC 拒绝服务 CVE-2026-23870，以及中间件绕过、预取授权、WebSocket SSRF、缓存组件 DoS、CSP nonce 相关 XSS 等一串 GHSA。官方把话说死：这类逻辑和协议叠出来的攻击面，靠 WAF 做规则拦截不可靠。用 App Router 的话把 next 升到 15.5.18 或 16.2.6，同步对齐 react-server-dom 与 React 19 补丁线，预发里把 middleware、动态路由和图片优化链多跑几遍，比赌运气稳。
pubDatetime: 2026-05-23T00:00:00Z
tags: ["Next.js", "React", "安全", "RSC", "升级"]
---

五月这轮 Next 和 React 的补丁线挺狠的，不只是一个 CVE-2026-23870 的 RSC 拒绝服务，连带中间件绕过、segment prefetch 授权、WebSocket SSRF、缓存组件和图片优化那块的 DoS、还有 CSP nonce 场景下的 XSS，一串 GHSA 一起落地。

我这两天看见群里还有人问能不能靠 WAF 顶一顶。Vercel 那边 changelog 写得挺直白，这类是框架和业务逻辑叠出来的面，指望规则库全覆盖不现实，该升版本就别赌运气。

我们线上 Next 15 的话按矩阵把 next 升到 15.5.18，走 16 的就到 16.2.6，同时把 react、react-dom 和对应的 react-server-dom-webpack 一类包跟 React 19 的补丁线对齐。我改完会重点回归 middleware、动态路由带参、prefetch 和 next 图片那条链，有自定义 i18n 或缓存键的再多跑一轮端到端。

如果你开了 PPR 或 Cache Components，别只跑冒烟，预发拉一点并发把 RSC 那条链路压一下，比上线后看监控曲线猜原因省事。

烦是真的烦，但被人扫出来更烦。这周把合并窗口腾出来先把补丁打了，比事后写事故复盘舒服。

#全栈成长之路
