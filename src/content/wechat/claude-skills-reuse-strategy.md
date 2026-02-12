---
title: Claude Skills 复用策略：用别人的 + 改自己的
description: 分享如何复用社区 Skill（如 seo-audit）、用 Vercel skills 命令实时同步，并在项目内做定制化扩展，兼顾更新与个性化需求。
pubDatetime: 2025-02-11T00:00:00Z
tags: ["Claude", "Cursor", "Skills", "AI", "工作流"]
---

最近在研究 Claude / Cursor 的 Skills 复用，有个思路挺实用，记一笔。

GitHub 上不少 Skills 质量很高，比如 seo-audit 这种。直接拿来用没问题，但有两个诉求：一是想跟着上游更新走，二是想按自己项目加点儿定制，比如站点的 title 规范、Open Graph 要求啥的。

可以这么干：把 seo-audit 放在全局环境，用 Vercel 的 skills 命令定期拉取，保证实时同步。同时在项目里维护一个 seo-audit-for-xxx 的 skill，专门写你这边的定制逻辑，并在里面引用全局的 seo-audit。

这样上游一更新，你自动跟上；项目特有的规则单独维护，不会和社区版本打架。两全。

1 全局 skill 负责通用能力，跟着社区走。

2 项目 skill 负责你的站点 title、og 标签、结构化数据偏好等，按需扩展。

3 项目 skill 通过引用全局 skill，复用其核心逻辑，只叠加自己那层。

试过几轮，体验不错。如果你也在用 Skills，可以试试这个分层思路。

#全栈成长之路
