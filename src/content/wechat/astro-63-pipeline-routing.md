---
title: Astro 6.3 出来以后，request 流水线终于能自己拼了
description: Astro 6.3 加了实验性高级路由，middleware、actions、pages、i18n 各拆成 handler 自己排顺序，Hono 也能直接接。远程图片优化会跟 10 次 HTTP 重定向，SVG 默认不让进 Sharp 优化管道，要开得显式配置。
pubDatetime: 2026-06-04T01:00:00Z
tags: ["Astro", "前端", "路由", "Hono", "Web 开发"]
---

Astro 6.3 发布了，我扫了眼更新，最吸引我的是实验性的高级路由。

以前 middleware、actions、i18n、pages 顺序是写死的，想加鉴权、限流或者打日志，经常得绕框架走。现在每个步骤都能拆成独立 handler，自己决定谁先谁后。比如 admin 路径先 redirect，再跑 pages，这种组合以前挺别扭。

想接 Hono 也行，从 astro/hono 里把 actions、middleware、pages 按需 use 进去，像拼乐高一样。

我自己博客还在 Astro 6.0，短期不急着升，但这个方向我觉得对：边界清晰了，复杂应用不用 fork 或搞奇技淫巧。

还有两个实用改动：远程图片优化会跟随最多 10 次 HTTP 重定向，每条跳转都会校验 allowlist，CDN 跳来跳去的图不再静默消失；SVG 默认不让进 Sharp 优化管道，怕不受信矢量文件埋雷，要开得显式写 dangerouslyProcessSVG。

你项目要是也卡在固定流水线里，可以盯一眼 advanced routing，等稳定了再动。

#全栈成长之路
