---
title: Dispatch 里粘多了，主会话 Token 会一直烧
description: Superpowers 的 Subagent-Driven Development 里，凡贴进 Dispatch 的内容会永久占住 Controller 上下文，每轮对话都会重读。审查 SubAgent 时大量 diff 尤其费 Token。Superpowers 改用 File Handoffs：任务全文和 diff 写进文件，Dispatch 只让 SubAgent 自己去读。
pubDatetime: 2026-07-05T00:00:00Z
tags: ["Superpowers", "Subagent", "Token", "File Handoffs", "AI编程"]
---

在 Superpowers 的 Subagent-Driven Development 中有一个细节：凡粘贴进 Dispatch 的内容，会永久占用 Controller 上下文，并在后续每轮被重读。

Controller 是主会话里的 Agent，读取 Plans、调度执行以及审查 SubAgent。

Dispatch 就是派 SubAgent 时发出去的 Prompt，有独立上下文，不和主会话历史混在一起。

但 Controller 的上下文，也就是主会话 Agent 从开始到现在的整段对话历史。Controller 通过 Dispatch 给 SubAgent 派活，而 Dispatch 里的提示词、SubAgent 回来的长回复，都会写进 Controller 历史；而这段历史在后续每一轮对话中都会被重新发给模型，特别是审查 SubAgent，每次都会有大量的 diff 内容。这个环节造成了 Token 的极大浪费。

目前 Superpowers 使用了 File Handoffs 来解决这个问题，就是以后在 Dispatch 中不放任务全文以及代码 diff 等内容，而是将这些内容写入到文件，由 SubAgent 自己读取文件。

#全栈成长之路
