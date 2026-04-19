---
title: 升 ky 2 之前，先把这几处坑对一下
description: ky 出了大版本，要求 Node 22 以上，prefixUrl 改成 prefix，钩子也收成单一 state 对象。新增跨重试的 totalTimeout、HTTPError.data 预解析响应体。旧项目别一把梭全量替换，先挑一条链路灰度，顺手把空响应和 204 的契约对齐。
pubDatetime: 2026-04-19T00:00:00Z
tags: ["HTTP", "ky", "fetch", "Node.js", "升级"]
---

最近有人在折腾基于 fetch 封装的 HTTP 小库 ky，2.0 这条线改动不小。

最明显的硬门槛是运行环境要 Node 22 往上走，老 CI 或容器镜像没跟上就先别动。

配置上 prefixUrl 改成了 prefix，baseUrl 按 WHATWG 规则来，searchParams 跟输入 URL 合并而不是一把盖掉，照发布说明逐项改比靠猜稳。

我比较有感的是重试：新版本有跨多次重试的 totalTimeout，网络晃一下的时候比只靠单次超时好控一点。出错时会把响应体预解析挂到 HTTPError.data 上，少写一层手动 json。但空体、204 这类边界现在会按解析失败暴露出来，以前是悄悄混过去的地方，升级后反而更容易在预发里炸出来，记得专门扫一遍。

别指望一行不改就升上去，挑一条调用链先灰，跑通再上全量。

#全栈成长之路
