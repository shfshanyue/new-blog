---
title: Skill 里也能关自动调用
description: 昨天讲了避免 SuperPower 自动调用的小技巧。其实在 Skill 的 Front Matter 里设 disable-model-invocation 为 true，就不会自动调用了。非标准属性，Cursor 和 Claude 支持，CodeS 大概率不行。好处是 Name 和 Description 不进上下文，能省 Token；但 SuperPower 的本意还是隐式调用，嫌麻烦可参考 Matt Skills 的显式工作流。
pubDatetime: 2026-07-14T00:00:00Z
tags: ["Skill", "Superpower", "Token", "Cursor", "disable-model-invocation"]
---

昨天讲了避免 SuperPower 自动调用的一些小技巧。其实还有一个办法：在 Skill 的 Front Matter 里设置 disable-model-invocation 为 true，这样它就不会自动调用了，需要你显式、手动去调用。

但这个属性并不是 Skill 的标准属性。Cursor 和 Claude 里面是支持的，CodeS 中大概率不支持。

用它还有一个好处：这个 Skill 的 Name 和 Description 都不会出现在会话的上下文中，能省下不少 Token。

对，但是追根结底，SuperPower 自身的哲学就是隐式调用，也就是自动调用。如果觉得它自动调用特别费劲的话，其实可以参考 Matt Skills 的工作流，它是需要你显式调用的。

#全栈成长之路
