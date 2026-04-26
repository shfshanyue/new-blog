---
title: ky 升到 2 之后，我先对的是那几条会绊脚的破坏性改动
description: ky 2.0 要求 Node 22 以上，钩子收成单一 state，prefixUrl 改成 prefix 并补了符合 WHATWG 的 baseUrl，searchParams 与输入 URL 改为合并而非覆盖。新增跨重试 totalTimeout、HTTPError 预解析等；空响应和 204 再调 json 会直接抛错，逼你把接口契约写清楚。老 Node 别硬升，先在边缘或小服务里按发布说明逐项过一遍。
pubDatetime: 2026-04-26T00:00:00Z
tags: ["前端", "HTTP", "Node.js", "工具", "开发效率"]
---

你如果还在各个项目里手写 fetch 封装，ky 2.0 这波大版本值得瞄一眼。

它硬性要求 Node 22 以上，钩子参数收成单一 state 对象，读起来像个设计过的 API，而不是一堆形参越加越长。prefixUrl 改成了 prefix，又补了符合 WHATWG 的 baseUrl；searchParams 和输入的 URL 会合并而不是一把盖住，这种细节真能少踩几次「明明带了参数怎么没了」的坑。

比较打动我的是跨重试的 totalTimeout，以及 HTTPError 上先把响应体 parse 好的那个 data 字段。空体和 204 再调 json 会直接抛错，乍一看烦，其实是逼你把接口契约想清楚，总比静默吞掉强。

老项目要是还卡在 Node 18、20，别急着全线升；先在边缘函数或小服务里按发布说明把那几条破坏性改动对一遍，省得生产里半夜救火。

#全栈成长之路
