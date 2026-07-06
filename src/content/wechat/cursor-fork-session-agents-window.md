---
title: Agent 聊偏了不用重来，Fork Session 一开就行
description: Cursor Agents Window 的 Fork Session 能从当前对话节点分叉出新会话，原会话保留不动。Claude 叫 branch，Codex 也叫 fork。Code Review 时若在主会话里逐个深挖、逐个修，容易污染上下文，fork 正好派上用场。
pubDatetime: 2026-07-06T00:00:00Z
tags: ["Cursor", "Fork Session", "Agents Window", "AI编程", "Claude Code"]
---

最近在 Cursor 的 Agents Window 里注意到 Fork Session，并频繁使用。在 Claude/Codex 中也有类似功能，Claude 里叫 branch，Codex 里也叫 fork。

fork 类似于 git 新建分支，也类似于 github 的 fork。ChatGPT 与 Claude 网页端也有类似功能。

我经常使用的一个场景，就是 Code Review。

有时候 AI 列出的问题比较多，我想让他基于某个问题再做更详细的解释，并单独针对某个问题进行修复。如果一直在这个主会话里聊天，一个一个去了解细节、一个一个去修的话，就会严重污染上下文。

这时候用 fork 就非常好。

#全栈成长之路
