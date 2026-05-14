---
title: 每年 JS 都在偷偷加料，你还在让模型按五年前写吗
description: ES2025 之后标准线还在往前拱，Node 26 里 Temporal 默认开启，日期这块终于不用全靠 Date 硬扛。更麻烦的是编辑器里 AI 仍按旧习惯吐代码：翻翻 release notes、给 agent 写几条新 API 优先规则，往往比只升级大版本更能省坑。
pubDatetime: 2026-05-14T01:00:00Z
tags: ["JavaScript", "Node.js", "Temporal", "AI 编程", "工程习惯"]
---

JavaScript 别看来来去去还是那几根骨头，标准每年都往下塞新 API。你现在上 Node 26，Temporal 已经默认能用了，时区这块比硬啃 Date 那套更像人话。

真正烦人的不是语法书背了多少，而是 Copilot 一类工具吐出来的一段，还停留在各种老 async 模板、能跑但读起来像五年前从论坛抄的习惯。lint 能过，心智负担却还在。

我自己的底线就两条：偶尔扫一眼 tc39 和 Node 的 release notes，知道今年到底多了啥；在项目里的 agent 提示里写几句硬偏好，比如日期优先走 Temporal、别再造一层 moment 式中间件。新东西先在脚本或小服务里试一圈，确认升级成本，再往主仓库推。

你把 runtime 提到新大版本，上层写法跟不上，那才是持续肉疼的来源。

#全栈成长之路
