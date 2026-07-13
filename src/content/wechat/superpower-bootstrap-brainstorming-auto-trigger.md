---
title: 问个无关的问题，它也要先 brainstorming
description: 有人反馈越来越少用 Superpower，因为不论问什么，系统都会先调用 brainstorming。这是插件 Bootstrap 机制在会话开始时注入 using-superpower 导致的。想降低触发率，可以删插件改用手动装 skill，或直接删 using-superpower，需要时再手动调 brainstorming。
pubDatetime: 2026-07-13T00:00:00Z
tags: ["Superpower", "Skill", "brainstorming", "Cursor", "Bootstrap"]
---

有人跟我讨论说，他们现在越来越少使用 Superpower 了，因为不论干什么，系统都会先调用 brainstorming 这个 skill。比如说，即便问一些与需求开发完全无关的东西，它也会先调用 brainstorming。

这时候有一种可能：这是通过 Superpower 插件安装的。在 Cursor、CodeX 的 Superpower 插件里，它会在每次会话开始的时候注入 using-superpower 技能，而这个技能在大部分情况下会优先让你使用 brainstorming。这个叫 Superpower 的 Bootstrap 机制。

如果你想降低自动触发的概率，可以尝试以下两种方法：

第一，你可以把这个插件删掉，改通过 skills 的命令去安装它。

第二，你可以直接把 using-superpower 这个 skill 删掉。每次先聊需求的时候，手动调用 brainstorming 这个 skill。

#全栈成长之路
