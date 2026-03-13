---
title: Kent 用 Cursor 把个人站从 Remix 迁到 React Router，顺便升了一堆依赖
description: Kent C. Dodds 用 Cursor 把 kentcdodds.com 从 Remix v2 迁到 React Router v7，依赖按难度分批升级，大改动交给后台 agent 跑，自己睡觉时修完类型和路由，最后合并上线。
pubDatetime: 2026-03-13T00:00:00Z
tags: ["Cursor", "迁移", "React Router", "Remix", "依赖升级"]
---

外国有个博主写了篇长文，讲他怎么用 Cursor 把个人站 kentcdodds.com 的依赖和框架升了一遍。代码量不小，四万多行代码、三十多万字内容。

他先让 Cursor 列了一版「没升到最新的包」，按升级难度分成简单、中等、困难三类。简单的先升，没问题；中等的一批升完，有几处小问题但都搞定了。他说能这么玩，是因为项目里本来就有不错的测试和文档，不然 agent 改完你心里也没底。

大改动他一个一个来。Vite 从 5 升到 7、Vitest 从 1 升到 4，一起做，一次过。Zod 升 v4 他知道 Conform （表单验证库） 有专门对接 Zod 的集成方式，就告诉 Cursor 用那个，也很顺。XState 升 major 他单独开了个对话，让 Cursor 先查迁移文档再动手，结果按文档改完就过了。

最重头的是 Remix v2 迁到 React Router v7。他用了 Cursor 的 background agent，给的任务里写了要查迁移文档、处理 Remix 相关依赖、还要把原来靠 patch 实现的「给 fetcher 加 header」改成别的方式（比如直接 fetch 再触发 revalidation）。

路由对不上之后，他给了 agent 一个验证方式：在分支里跑 npx react-router routes，和主分支上跑 npx remix routes 的结果对比，要求结构尽量一致。有了这个「对答案」的办法，下一轮就修好了。

类型那块他也没手改。让 agent 按 React Router 最新文档把 Loader、Action、组件里的类型都更新一遍，说你可以先做计划但不用等我点头，直接做，我要睡觉了。agent 在后台跑了二十多分钟，搞定了。期间 BugBot （Cursor 一个比较贵的功能，可以自动修复一些类型错误） 和 CodeRabbit 报了一些问题，他开了自动修，agent 跟着修了几轮，第二天拉下来再玩玩，就合并进 main 了。完整 diff 在他博客里贴了 PR 链接。

文末他聊了聊自己的状态：每天发很多很多条 prompt，好几个项目、本地加云端一堆 agent 同时跑，邮箱和 GitHub 通知不断，很难真正下班、也很难在家人面前忍住不摸手机回一条指挥云端 Agent。但他说，从没像现在这样觉得写代码这么好玩。

1 先让 Cursor 把过时包按难度分组，再分批升，比一把梭稳。

2 大版本迁移单独开对话、先查官方迁移文档，再让 agent 按文档改，出错少。

3 给 agent 明确的「怎么算对」的验证方式（比如对比路由表），比光说「你修好」有效得多。

4 有测试和文档，agent 改完你才敢信；没这些，大改还是得自己盯紧一点。

#全栈成长之路
