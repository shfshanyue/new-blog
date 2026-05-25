---
title: 换 Preact 不如换「投影」，这篇把我看精神了
description: Tanner 给 TanStack Start 做了一个更小的 React 客户端运行时投影：gzip 从六十多 KB 压到大约七到九 KB，用 Vite 按需把 portal、hydration 等整段 stub 掉。Preact 兼容在 React 19 上踩坑后，他改成保留公共 API、砍掉不需要的调度。个人站 JS 少约三成，RSC 重的页面 LCP 仍有回撤；库作者该认真想产品形状，业务线别瞎跟风换 runtime。
pubDatetime: 2026-05-25T00:00:00Z
tags: ["TanStack", "React", "构建优化", "性能", "前端工程"]
---

最近半夜刷手机点进一篇英文长文，越看越清醒。

作者搞 TanStack Start，槽点很直白：打包链路里 react-dom 客户端 gzip 常压在六十 KB 上下，业务还没进场，带宽先喂给 plumbing。

他试过 Preact 兼容层，卡在 React 19 的 use、portal、错误边界、水合边角，补丁叠补丁，最后承认：要的不是小号 React，而是把 hooks 合同和 Suspense 语义当稳定接口，下面换一版只为自家框架服务的实现。

做法是用 Vite 挂 redact 插件：nano 核心七 KB 多 gzip，full 九 KB 出头；portal、hydration 能整段 stub，用不上的不进模块图。RSC 仍走官方 react-server-dom，RSC 很重时 LCP 可能吃亏，数字写得直白。

个人站迁过去，线上 JS 少三成左右；路由压测帧率大概翻倍。一年前他以为得按月干，现在按天能搭轮廓，责任从只能信上游，慢慢变成敢不敢为自己的产品形状背书。

我不会劝你把核心系统换成实验 runtime。做框架或平台工程的人，倒是真该想想：默认整包通用库塞给所有人，还站得住多久。

#全栈成长之路
