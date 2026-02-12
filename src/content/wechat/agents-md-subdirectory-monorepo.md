---
title: 大仓库里怎么放 AGENTS 说明文件？子目录各一份，省 token 又贴上下文
description: 大 monorepo 可以在每个子包或子目录里放一份 AGENTS 说明文件；Agent 按目录树找离当前文件最近的那份，和 import 时找最近 node_modules 一样。前后端分开放说明，做前端活时不用读后端那堆，省 token，vibe coding 前后端放一起又能让 AI 看到完整上下文。
pubDatetime: 2025-02-12T00:00:00Z
tags: ["AGENTS", "monorepo", "vibe coding", "AI 编程", "上下文"]
---

AGENTS.md 可以放在子目录里，不一定要堆在项目根。

AGENTS.md 生效规则很简单：Agent 会沿目录树找「离当前编辑文件最近」的那份，谁近用谁。所以对于 monorepo 来说，每个子项目可以有一套自己的 AGENTS.md，互不打架。这跟前端 import 某个库时，在最近的 node_modules 里找，是一个道理。

现在 vibe coding 用得多了，很多人把前端后端都放在一个仓库里，这样 AI 能同时看到前后端，上下文更完整，更有利于 AI 做决策。但 AGENTS.md 不必全塞在一份里：根目录一份、前端目录一份、后端目录一份，分开维护。

好处是省 token。你在前端改样式、改组件，跟 API 没关系，就不用把后端那套 AGENTS.md 也读进来。

这与 Skill 复用 references 目录一样，按需复用。

Next.js 最佳实践那个 Skill，里面既有 rerender 的最佳实践，又有 SSR 的最佳实践，全塞在一起会很大。所以它搞了一个 rules 目录，和 references 目录同理。你碰到 rerender 的问题，先搞清楚是 rerender 里哪一条 rule 导致的事，再去找那份 rule 对应的 markdown 就行，不用整个最佳实践都读。

#全栈成长之路
