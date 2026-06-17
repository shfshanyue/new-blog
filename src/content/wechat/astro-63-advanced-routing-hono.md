---
title: Astro 6.3 把请求管道拆开了，middleware 终于能自己排顺序
description: Astro 6.3 上了实验性 advanced routing，middleware、actions、pages、i18n 可以像乐高一样重排。还能直接接 Hono，/admin 先鉴权再进渲染。个人博客暂时用不上，但多服务拼接会比在 middleware 里硬写舒服。
pubDatetime: 2026-06-17T00:00:00Z
tags: ["Astro", "Hono", "路由", "前端框架", "中间件"]
---

Astro 6.3 出了个实验性功能，叫 advanced routing。说白了就是把请求管道拆开了，middleware、actions、pages、i18n 这些步骤你可以自己决定谁先谁后。

以前 Astro 固定一套顺序，项目大了想加鉴权、限流、日志，经常得在 middleware 里绕来绕去。现在可以直接接 Hono，或者走 Cloudflare Workers 那套 fetch handler。比如 /admin 路径你自己 redirect，剩下的再交给 Astro 渲染。

还有个细节挺实用：远程图片优化现在会跟着 HTTP 重定向走，CDN 跳转到边缘节点那种场景不会再默默丢图了。不过 SVG 栅格化默认关了，不受信的矢量图别硬转 PNG，配置里得显式开 dangerouslyProcessSVG。

我这个博客站暂时用不上高级路由，但要是以后要在同一个 Astro 项目里拼 API 代理、多服务转发，我会优先考虑这套，比在 middleware 里堆 if 干净。

想试的话文档搜 advanced routing，记得开实验开关。

#全栈成长之路
