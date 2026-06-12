---
title: Node 核心团队开始讨论：AI 生成的 PR 该怎么审
description: 四月份伦敦 Node.js 协作峰会上，维护者讨论了 AI 生成贡献的审核策略，以及 Node 27 发布节奏、可迭代流与 OpenTelemetry 等方向。开源 PR 越来越多来自 AI，光 CI 通过不够，还得讲清楚改动、承担后续维护。
pubDatetime: 2026-06-12T00:00:00Z
tags: ["Node.js", "开源", "AI", "Code Review", "工程实践"]
---

四月份伦敦那场 Node.js 协作峰会上，有个话题挺扎眼：AI 生成的贡献，该怎么审。

核心维护者不是在聊 AI 会不会取代谁，而是在聊审核策略。现在 PR 里 Agent 或 Copilot 写的代码越来越多，CI 能过，但设计意图和维护成本谁负责？

顺便还盘了 Node 27 发布节奏、node:stream/iter 可迭代流、OpenTelemetry 等方向。配上 26.1 实验性 FFI 和 Temporal 默认开启，Node 正在一批很硬的工程决策里。

我觉得以后给开源提 PR，光 CI 绿不够。维护者会更在意你能不能把改动讲明白、愿不愿意背后续的 bug。AI 能写 diff，ownership 还得是人。

#全栈成长之路
