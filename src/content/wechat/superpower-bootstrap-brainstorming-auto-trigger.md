---
title: 问个无关的问题，它也要先 brainstorming
description: 有人反馈越来越少用 Superpower，因为不论问什么都会先调用 brainstorming，根因是插件 Bootstrap 注入 using-superpower。可写在 agents.md、给 skill 关自动调用字段、删 using-superpower，或删插件改手动装 skill。
pubDatetime: 2026-07-13T00:00:00Z
tags:
  ["Superpower", "Skill", "brainstorming", "Cursor", "Bootstrap", "agents.md"]
---

有人跟我讨论说，他们现在越来越少使用 Superpower 了，因为不论干什么，系统都会先调用 brainstorming 这个 skill。比如说，即便问一些与需求开发完全无关的东西，它也会先调用 brainstorming。

这时候有一种可能：这是通过 Superpower 插件安装的。在 Cursor、Codex 的 Superpower 插件里，它会在每次会话开始的时候注入 using-superpower 技能，而这个技能在大部分情况下会优先让你使用 brainstorming。这个叫 Superpower 的 Bootstrap 机制。

如果你想降低自动触发的概率，可以试试下面几种办法，从轻到重：

第一，在项目 agents.md 里写清楚：非需求开发类问题，不要自动调用 brainstorming 或 using-superpower。这是给模型的软约束，只能减轻乱调用的概率。

第二，给 brainstorming 或 using-superpower 加上关闭自动调用的配置。Cursor 和 Claude 可以在 Front Matter 里设 disable-model-invocation 为 true；Codex 则在 skill 目录下放 agents/openai.yaml，把 allow_implicit_invocation 设成 false。这样能减少隐式匹配，顺带省点 Token。

第三，直接把 using-superpower 这个 skill 删掉。每次真要聊需求的时候，手动调用 brainstorming。

第四，你可以直接把 superpower 这个插件删掉，避免每次会话开始的时候自动注入开启 bootstrap 机制，并通过 skills add 命令行的方式添加相关 skill。

#全栈成长之路
