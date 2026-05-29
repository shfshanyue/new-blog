---
title: React 还能瘦到 9KB？TanStack 作者对自己动刀了
description: TanStack 作者嫌 React 约 60KB gzip 太大，preact/compat 对不上 React 19，AI 一天做出 redact，full 约 9.4KB，两站实跑，JS 少传、FCP 变快，窄实验非替代品。
pubDatetime: 2026-05-29T00:00:00Z
tags: ["React", "TanStack", "性能优化", "打包体积", "前端工程"]
---

你们平时骂 React 包大，TanStack 那位是真动手了。

他搞 Start 时发现，Vite 打出来的 React 客户端光 runtime 就六十多 KB gzip，Router、Query 加起来还没它大。先试 preact/compat，React 19 的 use、Server Actions、portal 对不上，补丁堆到第五层就放弃了。

他换了个说法：React 公共 API 是基表，仓库里那套实现只是其中一种物化视图。让 AI 按 TanStack 要的最小面重写，一天搞出个叫 redact 的运行时。full 预设大概 9.4KB gzip，比官方 React 小八成；并发调度、DevTools 这些 Start 用不上的直接砍，portal、Suspense、hydration 还能当开关 stub 掉，没开的代码根本不会进打包图。

更离谱的是已经上线跑了：个人站 JS 少传三分之一，FCP 还能快一截；tanstack.com 这种全家桶也能扛，大站客户端 JS 少了将近 1MB，就是 RSC 重的页面 LCP 会慢一点，他还在修。他自己说这不是替代 React，也不打算大力营销，免得大家拿它跟官方 React 杠。但我觉得意思挺清楚：以前自己投影一版依赖成本太高，现在一天能磨出来，库如果也吃得死，忍 upstream 默认值未必还是最优解。

#全栈成长之路
