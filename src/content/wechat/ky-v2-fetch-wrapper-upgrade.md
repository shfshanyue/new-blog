---
title: 封装了一堆 fetch，不如看看 ky 2 把超时和重试收干净了没
description: ky 2 要求 Node 22 起步，钩子改成单一 state 对象，prefixUrl 改名 prefix，并新增 baseUrl；searchParams 与输入 URL 合并而不是覆盖。新加了跨重试的 totalTimeout、HTTPError.data 预解析响应体，空体调 json 会直接抛错逼你对齐契约。老项目里手写 fetch 堆起来的工具函数，可以对照发行说明做一次迁移盘点。
pubDatetime: 2026-04-25T01:00:00Z
tags: ["HTTP", "ky", "Node.js", "前端工程", "依赖升级"]
---

发请求这件事，我很多时候就是手写 fetch，图个少依赖。可一旦要加重试、超时、拼 baseUrl，代码里又会慢慢长出一层自己的「小 axios」。

ky 升到 2 之后门槛抬到 Node 22，钩子参数收成一个大对象，prefixUrl 改成 prefix，又补了更符合规范的 baseUrl。searchParams 会跟输入 URL 合并而不是一把覆盖，以前踩过「传了对象结果把 query 冲没了」的人，应该能秒懂这条改动在救什么。

我印象最深的是 totalTimeout 可以跨重试算总时间，还有 HTTPError.data 把响应体先 parse 好，catch 里少写一堆样板。空响应和 204 再强行调 json 会直接报错，听起来烦，其实是逼着前端跟后端把返回体约定说清楚。

如果你仓库里已经有一坨 fetch 封装，不如趁大版本把超时、重试和错误分支理一遍，别等线上某条链路卡到超时了才想起来从来没人测过。

#全栈成长之路
