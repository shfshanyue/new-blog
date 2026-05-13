---
title: Node 26 默认开了 Temporal，我还在靠 Date 心算时差
description: Node 26 Current 把 Temporal 默认打开了，本机不用再加实验开关就能用日历、时区那套对象化写法。V8 跟着升到 14.6，内置 HTTP 走 Undici 8。semver-major 里 legacy stream 子路径和 writeHeader 是真删，升级别只改版本号。我习惯先在 REPL 里跑一遍官方文档里最短的那段日期输出，对上日历再继续动业务代码。
pubDatetime: 2026-05-13T00:00:00Z
tags: ["Node.js", "Temporal", "JavaScript", "升级", "运行时"]
---

Node 26 走 Current 了，Temporal 默认开着，以前那种翻来覆去找实验开关的步骤可以先收起来。

我以前也很依赖 Date，减八小时、夏令时一改全靠脑子里过一遍，字符串当真理，出事再救火。Temporal 把纯日期、时间和带时区的东西拆开，读起来啰嗦，反而少含糊。

这一版 V8 到 14.6，Map 多了 getOrInsert 一类小糖，内置 HTTP 客户端跟着 Undici 8 往前走。更刺手的是 semver-major，legacy stream 子路径、writeHeader 这种老旧入口直接没了，你只 bump 版本不跑测试，基本就是给自己找连夜加班。

我在本机开 Node 26 的 REPL，照着文档用最短那一行把今天的公历日期打印出来，对着手机日历对了一眼，确认没翻车再去想业务里哪些字符串可以慢慢还。

仓库里如果还有大段日期当字符串的债，别指望一次魔法迁移，先把清单列出来，能改一个模块就先改一个模块，滚完测试矩阵再上线最实在。

#全栈成长之路
