---
title: 用了 RTK 之后，AI 不再反复跑 build 了
description: AI 原生执行 pnpm build 时为了省 token 会截断输出，信息不够又反复执行，既费 token 又费时间。用 RTK 压缩输出后，一次就能拿到关键信息，效率提升明显。
pubDatetime: 2026-03-19T00:00:00Z
tags: ["AI", "RTK", "工程化", "Cloud Code", "效率"]
---

再次推荐一下 RTK，重要的不只在于节省 toke，更在于节省时间。上一次的文章可以参考这里。 [RTK CLI 如何帮 AI 省下大把 Token](./rtk-cli-saves-tokens-and-time.md)

最近我给手头几个项目都加上了 RTK。rtk init 就会帮你生成 CLAUDE.md，有必要的话可以收到换成 AGENTS.md，触发时机大概是这样的：

以前我每次让 AI 跑任务，都会让它最后执行一次 pnpm test 和 pnpm lint。结果有一次我发现，它为了省 token，AI 把标准错误重定向到标准输出之后，只看最后 10 行，或者只看前 10 行，或者 grep 用关键字或正则去匹配 error。

第一次发现有 error 但那几行提供的信息不足以解决问题，又往上下各扩了 5 行。问题是上下 5 行的信息还是不够，于是它就反复重新执行。这就不只是浪费 token 了，时间也搭进去了。来来回回跑了四五遍 pnpm build，最终才得到某个异常的足够上下文。

用了 RTK 之后它会把输出信息压缩，只保留最核心的部分。一次就能拿到关键信息，不用再反复跑了，整体效率和体验都提升了不少。不过 rtk 也不能直接生硬地添加前缀，你需要查看他是否支持某个命令，比如 eslint 他会做更好的适配，而 biome 其他的就相对差了些。

最后再提供一个命令 rtk gain 可以查看 rtk 帮你节省了多少 token。

#全栈成长之路
