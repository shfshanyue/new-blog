---
title: ky 2.0 这一刀，我先从 Node 版本和超时开始对齐
description: ky 2.0 把最低版本抬到 Node 22，重试链路里可以用 totalTimeout 做整段兜底。prefixUrl 改成 prefix，searchParams 合并规则也变了。HTTPError 会带上预解析的 data，空体和 204 走 json 会直接抛错，适合先把契约想清楚再全项目铺开。
pubDatetime: 2026-04-22T00:00:00Z
tags: ["HTTP", "ky", "fetch", "Node.js", "依赖升级"]
---

最近我在升级依赖时扫到 ky 2.0，第一眼看 release notes 还挺克制，真落到代码里改动点其实挺密。

它把运行环境抬到 Node 22 以上，如果你本机还在 20 来回晃，别只改 package，CI 镜像、线上容器、边缘函数的运行时也要一起对齐，不然就是本地过了线上炸。

我更在意请求层面的语义：2.0 加了 totalTimeout，能把重试串起来的整段时间兜住，省得我在业务里再套一层计时器和竞态。

命名也有几处会顺手写错：以前的 prefixUrl 现在叫 prefix，同时又补了 baseUrl 这一套更标准的拼法。searchParams 也不再是你记忆里那种「覆盖式」合并，迁移时最好把几个典型 URL 用例跑一遍 diff。

还有几块属于不改测试就容易漏的：钩子参数收敛成一个 state 对象；HTTPError 里多了预解析的 data；空响应和 204 再强行 json，会直接抛错，听起来烦，但本质是逼你把接口契约写清楚，别靠侥幸吞掉。

我一般会先挑一个小页面或边缘函数试点，把最常见的 GET、POST、超时、重试和几种错误体跑通，再全仓库铺开。

#全栈成长之路
