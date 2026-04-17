---
title: ky 升到 2 了，我连超时都想打包带走
description: ky 2.0 把门槛抬到 Node 22，钩子签名收成单一 state 对象，prefixUrl 拆成 prefix 和符合 WHATWG 的 baseUrl，searchParams 也和输入 URL 合并而不是一把覆盖。新加跨重试的 totalTimeout、HTTPError.data 预解析 JSON，空体和 204 会抛解析错误逼你看清契约。适合在浏览器和边缘里替代手写 fetch，但迁移得按 release note 把钩子和空响应处理过一遍。
pubDatetime: 2026-04-17T00:00:00Z
tags: ["HTTP", "fetch", "ky", "Node.js", "前端工具"]
---

你手写 fetch 封装写烦了没，我现在更愿意直接上 ky。

2.0 这版口气挺硬，Node 要 22 往上，老项目别闭着眼睛升。我眼里最实用的是 totalTimeout，重试几次也能兜个总时长，省得接口卡死把你整页一起挂在那干瞪眼。

prefixUrl 改成 prefix，又补了符合规范的 baseUrl，算是把以前那些绕口名字一次性理顺。空响应和 204 这种坑，它现在会让你早点撞上，别假装契约一直很美好。

钩子也换了，参数收成一块 state，读起来没那么像猜谜，但你要是真有一堆旧封装，还是得对着 release note 一行行改。

我一般会先在一条边缘路由里试点，把超时、重试和错误体打印跑一圈，再上全站。

你要是只调两下内部接口，用啥都行。可一旦要在边缘函数和浏览器共用同一套 HTTP 习惯，像这种库升一级，往往比你自己补丁堆三年省心。

你最近有动 HTTP 客户端吗，还是继续裸 fetch？

#全栈成长之路
