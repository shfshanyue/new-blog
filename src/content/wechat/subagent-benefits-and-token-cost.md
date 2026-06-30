---
title: Subagent 挺好，就是 Token 不够
description: Subagent 上下文干净、还能指定模型做探索和 Code Review；但 Subagent 驱动开发会拆多个 Task 用高级模型，Token 扛不住。平时 Cursor 额度紧，要么不用，要么全指定 Composer 2.5 非快速版。
pubDatetime: 2026-06-30T00:00:00Z
tags: ["Subagent", "Cursor", "Token", "Composer", "AI编程"]
---

Subagent 至少有以下两个好处：

1 上下文干净：使你的开发少受被污染的上下文所影响。当你的一次 Session 已经使用了 70% 的上下文时，你使用 Subagent，它不会把这 70% 的上下文带进去污染你的环境。

2 可以指定模型：比如我们针对某个 feature 开发时，在开发之前可以搞一个 Explore Subagent 去做代码调研；在开发完之后，可以做一个 Code Review Subagent 去做代码审查。这两个阶段都可以使用比较高级的模型，如 opus 以及 gpt 5.5。

缺点方面，Subagent 本身没有缺点，缺点在于我的 Token。当我使用 Subagent 驱动开发（Subagent-driven development）时，它会将 Plan 拆分为多个 Task，基于 Task 的复杂度来决定使用不同模型并通过 Subagent 进行实现。

这非常好，但问题在于我没有那么多高级模型的 Token，而且我也不想去用 Composer Fast（相同的质量，更快的速度，六倍的价格）。

因为我平时工作使用 Cursor，高级模型的 Token 总是不足，所以我一般不直接使用 Subagent 驱动开发。或者我会在使用 Subagent 驱动开发时，让它全部使用 Composer 2.5 非快速模型。

#全栈成长之路
