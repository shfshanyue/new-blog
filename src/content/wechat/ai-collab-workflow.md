---
title: 我跟 AI 的协作流程
description: 从 Plan 出 TODO 交给 Agent 实现，到用 Ask 看 diff 审代码，有问题再回 Agent 改，最后 AI Commit。四步循环，改两三轮就够用。
pubDatetime: 2025-02-01T00:00:00Z
tags: ["AI 协作", "Cursor", "工作流", "Plan", "Agent"]
---

分享下我与 Vibe Coding 的协作流程。

1. Plan 阶段。先把需求拆清楚，改一两轮，生成多个 TODO，交给 Agent。

2. Agent 阶段。Agent 按 TODO 编写代码，改一两轮，中间自己看看效果、审查代码，觉得差不多了就停。如果 Plan 阶段审查做得好，那这一阶段需要改的次数就少。

3. Ask 阶段。在 Ask 里 @diff Branch 并 @ 相关的 skill，让 AI 专门代码审查一遍当前改动。有问题再切回 Agent，把提到的那几处改一改。

4. AI Commit。手动点击 AI Commit 按钮，AI 自动生成 commit 信息并执行提交。

另外，这个流程还有一些可以优化或者说考量的地方，但我一般也就以上几步。考量的地方包括：

1. Plan 后，可由 AI 再度进行审查，而我目前仍然以人工大致审查为主。

2. 可开三四个 git worktree 进行并行开发，而我目前还不习惯这一做法。

3. AI Commit 以及 git push 目前仍然由我手动触发，而非由 AI 自动地去 commit/push，这让我觉得让渡权利略大。

#全栈成长之路
