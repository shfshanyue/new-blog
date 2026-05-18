---
title: 本地开发别再口头对五位端口号了
description: README 里堆满 localhost 加五位端口，协作抄错一位就耗半天。Vercel Labs 的 portless 把入口换成 https 下带项目名的子域，内置 HTTPS，OAuth 调试更顺手，Tailscale 场景也好用。接入前对照反向代理、回调白名单和 HSTS，别让旧配置绊脚。
pubDatetime: 2026-05-18T00:00:00Z
tags: ["本地开发", "开发者体验", "Vercel", "HTTPS", "协作"]
---

多人并行开发微服务的时候，最怕 README 里一屏幕的 localhost 加五位端口，新人抄错一位就要对半天环境，有时候连你自己过两周都忘当初占的是哪一个。

最近留意到 Vercel Labs 有个叫 portless 的小开源项目，思路很简单：别让人死磕数字端口，把入口改成更顺口的 https 子域，像文档里爱举的 myapp 点 localhost 这一类，项目名直接写进地址里。内置 HTTPS 也很实在，调 OAuth 回调、第三方登录比纯 http 本地站顺手一圈，写进 README 也不显得那么随手。

如果你在公司用 Tailscale 给别人看临时 demo，固定名字也比口头报随机端口省心，协作摩擦会小一点。

接入前照旧扫一遍反向代理、redirect 白名单和浏览器里旧 HSTS 记录这套老三样，别被自己以前的配置绊住就行。

#全栈成长之路
