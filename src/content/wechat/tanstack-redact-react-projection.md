---
title: React 还在占你 60KB，有人已经裁到 7KB 了
description: TanStack 的 Tanner 做了个叫 redact 的实验：把 React 公开 API 当底子，按 Start 栈真正用到的能力重投影一版运行时。先试 Preact compat 对不上 React 19，改让 AI 一天 prompt 出来。nano 预设 gzip 约 7KB，对比 Vite 打出来的 client 六十多 KB 能少八成；个人站和 tanstack.com 已在跑，博客 JS 传输量能少三分之一，他也不想当替代 React 来推。
pubDatetime: 2026-05-31T00:00:00Z
tags: ["React", "TanStack", "打包体积", "前端性能", "工程实践"]
---

你们装前端项目的时候，有没有觉得最烦的一点是：框架里那块最小、还不能卸的依赖，往往也是最肥的？

TanStack 的 Tanner 最近搞了个实验，包名叫 redact。他本来想把 Start 栈里的 React 换成 Preact，结果 React 19 的 use、服务端 action、hydration 边缘一堆对不上，补洞补到第五层就不干了。

他换了个思路：公开 API 是合同，官方 React 只是其中一种实现。Start 走同步友好路线，并发调度、DevTools、整条 RSC 客户端反序列化，很多用户根本碰不到。那就让 AI 按规格投影一版，一天 prompt 下来，nano 预设 gzip 大概 7KB，完整版也就 9KB 多，对比 Vite 打出来的 React client 六十多 KB，体积能砍掉八成左右。

他自己的博客和 tanstack.com 已经切过去了。小站 JS 传输量能少三分之一，大站客户端能少近 1MB，Lighthouse 分数没掉。他明确说不想当「替代 React」来营销，更像给自己裁的 Linux 发行版。

我看完最大的感触不是「赶紧换」，而是：你还在默认给所有用户 ship 上游的全套通用能力吗？对你自己的栈来说，哪些才是真要的？

#全栈成长之路
