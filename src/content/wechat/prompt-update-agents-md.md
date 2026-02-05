---
title: 发现 AI 用错方式？加一句「并更新 AGENTS.md」
description: 让 AI 用对工具、记对约定，不用每次都重新试错。当你纠正它时，顺带说一句「并更新 AGENTS.md」，把约定写进项目，下次直接按文档来，省 token 也省心。
pubDatetime: 2026-02-05T00:00:00Z
tags: ["AI", "提示词", "AGENTS.md", "工程实践", "效率"]
---

分享一个我一直在用的提示词：请使用 xxx，并更新 AGENTS.md。

啥意思？就是你在让 AI 做某件事的时候，如果这件事和项目约定有关，就顺便告诉它：用对的方式做，并且把这条约定写进 AGENTS.md。

举两个例子

你让 AI 帮你升级依赖，项目明明用的是 pnpm，它却按 npm 来。你可以说：请使用 pnpm，并更新 AGENTS.md。它改完这次，还会在 AGENTS.md 里记一项「本项目使用 pnpm」，下次就不会再走 npm 那套了。

再比如用 Python 的时候，AI 经常忘记先进虚拟环境。你可以说：请使用 uv run xxx，并更新 AGENTS.md。它这次用 uv run 执行，同时把「Python 命令请通过 uv run 执行」写进 AGENTS.md。

当然，就算你不说，AI 发现命令报错后也会去找 lock 文件、推断出该用 pnpm 或 uv。但那样它要多跑几轮，多花 token，你也要多等一会儿。不如第一次纠正的时候就让它把约定固化下来，后面所有对话都能直接用。

就比如我最近一个项目把 shadcn 相关的那个 cn 函数的路径改了，导致 AI 每次都会使用 shadcn 默认的 cn 函数路径，随后报错，随后 LSP 发现错误，再改正错误。但每次看到这都很闹心，直到我更新了 AGENTS.md，。

简单来说，实时维护这份 AGENTS.md，省的是自己的时间和 token。

PS: 其实昨天在 https://mp.weixin.qq.com/s/hcA3w1DiLP0xpjacJ00XLA 分享了一些我的提示词，不过有几条有点激进，可以参考。

#全栈成长之路
