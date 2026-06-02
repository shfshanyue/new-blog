---
title: 为了一小块服务端组件，你把整棵路由树拧反了吗？
description: TanStack 提出 RSC 不只是「服务端拥有树 + use client」这一种架构，更是可流式传输的协议。以仪表盘为例：当页面几乎全是客户端交互、只有一块重图表需在服务端渲染时，强行 server-first 可能要整条路由标 use client；反过来可在 client-owned 树里按需嵌入服务端 Flight 片段，避免为一块 UI 拧转整站架构。
pubDatetime: 2026-06-02T00:00:00Z
tags: ["RSC", "React", "TanStack", "前端架构", "服务端渲染"]
---

一提到 RSC，脑子里基本都是：服务端拥有组件树，交互处打 use client。

TanStack《谁拥有树》说得挺直白：RSC 还是一套协议，把服务端渲染结果打成 Flight 流，客户端再还原。架构只是用法之一。

做个仪表盘：Tab、筛选、拖拽、乐观更新全是客户端的活，只有一张分析图又慢又重，还得在服务端算、背几百 KB 图表库。

走服务端拥有树，你得把整个路由倒过来，一路标 use client，祈祷边界卡对位置——为了嵌一块服务端 UI，整站变 server-first。

反过来？仪表盘继续 client-owned，用 server function 拉已渲染的图表片段，塞进 Tab，旁边 client state 不动。两招还能对称玩：服务端树把 use client 往上推，底下照样 SPA。

我更站后者：用户手指摸的是客户端，控制层该在浏览器；要算力时再局部调包。

不一定马上换框架，但这分法够你问自己：是不是为了一块服务端组件，把整棵路由树都拧反了。

#全栈成长之路
