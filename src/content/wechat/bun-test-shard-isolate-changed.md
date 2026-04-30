---
title: Bun 这次给测试加的开关，比「又快了百分之几」更实在
description: Bun 1.3.13 里 bun test 多了 --isolate、--parallel、--shard 与 --changed 等选项，分片语义对齐 Jest、Vitest、Playwright，CI 可拆 matrix；isolate 减少文件间全局污染，changed 只跑相对分支的增量用例。顺带流式解压 tarball 压 bun install 内存峰值，大仓库跑测更省心。
pubDatetime: 2026-04-30T00:00:00Z
tags: ["Bun", "测试", "CI", "前端工程", "工具链"]
---

Bun 最近给 bun test 加了好些开关，我看完 release note 的第一反应不是又快了百分之几，而是终于能把大仓库的测试编排写清楚一点了。

分片可以直接写 bun test --shard=1/3，语义跟 Jest、Vitest、Playwright 那套对齐，CI 里按 matrix 拆几台机子不用再各写各的切片脚本。最怕每台机子跑的子集规则不一致，对齐以后脚本能抄来即用。

--isolate 是每个文件一份干净全局，以前 A 文件改了 mock 或全局状态把 B 文件带崩的情况会少很多。--changed=main 只跑相对 main 有变动的用例，本地 push 前扫一遍，比动不动全量跑省一大截时间。

这版 bun install 还默认流式解压 tarball，官方说能压内存峰值，常驻内存也大概有百分之五左右的下降，算顺手升级的甜头。管线顺了，发版心里才踏实。

#全栈成长之路
