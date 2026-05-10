---
title: 本地开发别总跟四位端口较劲了
description: Vercel Labs 开源 portless，把入口从 localhost 加随机端口收成固定主机名（如 myapp.localhost），内置 HTTPS，新版本在 Tailscale 联调场景里也做了补强。能少改 README 和 OAuth redirect 里的端口号，但接入前要过一遍反向代理与浏览器 HSTS，别被自己的环境坑到。
pubDatetime: 2026-05-10T00:00:00Z
tags: ["前端工具", "本地开发", "Vercel", "开发者体验", "DX"]
---

你本地起服务是不是还在 copy 一串 localhost 加四位端口？新人照着 README 一步一步来，端口和你不一样整张表就对不上，群里还有人问「我这边开成 3001 行不行」，你听都听麻了。

Vercel Labs 开源了 portless，思路很简单：别老让人记数字端口，换成稳定的开发域名，类似 myapp 点 localhost 这种，HTTPS 也一并搞定。新版本在 Tailscale 场景里又补了一刀，两台机器远程联调少很多来回解释。

你接入之前最好想三件事：现有 nginx 或别的反代会不会挡路，OAuth 回调地址有没有写死端口号，以及浏览器 HSTS 会不会把你自己坑一把。这三条线捋顺了，比文档里多写十行「请先确保端口未被占用」有用。

你要是负责新人 onboarding，这种「点开就能进」的细节，优先级其实可以往前提一提。

#全栈成长之路
