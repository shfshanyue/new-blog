---
title: 用 Linear 或 GitHub 和 AI 一起做「发帖审核」流水线
description: 用 OpenClaw 大龙虾 + Linear MCP 搭了一套自动发帖流程：AI 按模板发到 Linear，人审过了就发，不过就打回改。团队协作工具配上 AI，成了你和 Claude 一起干活的地方；用 GitHub 也一样，一发帖就开 PR，合并再发。
pubDatetime: 2025-03-05T00:00:00Z
tags: ["AI", "Linear", "GitHub", "自动化", "协作"]
---

这两天用 OpenClaw 大龙虾和 Linear 搭了一套某站的自动发帖流程。靠的是 Linear MCP：大龙虾每天按固定模板把帖子发到 Linear，你审核，过了就发，不过就打回去让它改。

以前对这类协作软件有点抵触，现在有了 AI，它反而成了你和 Claude 一起协作的台子。我这次用的是 Linear，用 GitHub 也行：发一篇就提一个 PR，你通过就合并、然后发；不通过就写意见打回，AI 改完再提，合并后再发。

1 流程就三步：AI 按模板产出 → 你审 → 过就发，不过就改。

2 工具选 Linear 或 GitHub 都行，本质都是「先审后发」，避免 AI 直接往外丢内容。

#全栈成长之路
