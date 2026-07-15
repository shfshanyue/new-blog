---
title: Skill 里也能关自动调用
description: 昨天讲了避免 SuperPower 自动调用的小技巧。Cursor 和 Claude 可在 Skill Front Matter 里设 disable-model-invocation 为 true；Codex 则在 agents/openai.yaml 里设 allow_implicit_invocation 为 false。前者还能省 Token；SuperPower 本意仍是隐式调用，嫌麻烦可参考 Matt Skills 显式工作流。
pubDatetime: 2026-07-14T00:00:00Z
tags:
  [
    "Skill",
    "Superpower",
    "Token",
    "Cursor",
    "Codex",
    "disable-model-invocation",
  ]
---

昨天讲了避免 SuperPower 自动调用的一些小技巧。其实还有一个办法：在 Skill 的 Front Matter 里设置 disable-model-invocation 为 true，这样它就不会自动调用了，需要你显式、手动去调用。

但这个属性并不是 Skill 的标准属性，Cursor 和 Claude 里面是支持的。Codex 走的是另一套：在 Skill 目录下放 agents/openai.yaml，把 allow_implicit_invocation 设成 false，它就不会根据描述自动匹配调用了，但你还可以用 $skill 手动唤起。具体写法见 learn.chatgpt.com/docs/build-skills。

在 Cursor 和 Claude 里用它还有一个好处：这个 Skill 的 Name 和 Description 都不会出现在会话的上下文中，能省下不少 Token。

对，但是追根结底，SuperPower 自身的哲学就是隐式调用，也就是自动调用。如果觉得它自动调用特别费劲的话，其实可以参考 Matt Skills 的工作流，它是需要你显式调用的。

#全栈成长之路
