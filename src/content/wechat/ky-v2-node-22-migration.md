---
title: 升 ky 2.0 之前，先别急着只改 package.json
description: ky 升到 2.0 后要求 Node 22 以上，钩子签名收成单一对象，prefixUrl 改为 prefix，searchParams 与入站 URL 合并而非覆盖；新增跨重试的 totalTimeout、HTTPError.data 等，空响应再当 JSON 解析会更严格。封装厚的项目应对照发布说明逐步迁移。
pubDatetime: 2026-04-14T00:00:00Z
tags: ["HTTP", "ky", "Node.js", "依赖升级", "前端工程"]
---

最近我把一个小项目里手写的 fetch 封装换成了 ky，顺手看了 2.0 的说明，发现这次升级得把环境和写法一起算进去，不是多两个配置项就完事。

2.0 要求 Node 22 起步。你 CI 和线上如果还停在 18 或 20，别先升包，先把运行时对齐，否则装依赖都能卡半天。

接口层面也要动几处：钩子函数的签名收成一个大对象往里传；以前的 prefixUrl 改成了 prefix，又多了符合 WHATWG 规则的 baseUrl；searchParams 现在是和原始 URL 合并，不是一把覆盖掉。老代码里要是靠覆盖 query 偷懒，得改习惯。

新东西里 totalTimeout 能跨重试算总超时；HTTPError 上能直接读到预解析好的 data，少写一层解析。反过来，空 body 和 204 再当 JSON 去解析会更容易报错，算是逼你把接口契约写清楚。

封装层厚、中间件多的项目，别指望只改个版本号，按发布说明一条条对照最省事。

#全栈成长之路
