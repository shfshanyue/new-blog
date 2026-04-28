---
title: TS 编译器换 Go 了，我先关心 CI 能省几分钟
description: TypeScript 7 出了 Beta，原生编译器用 Go 写，CLI 叫 tsgo，官方说常见场景能比 6 快不少。真升级会连着 6.0 的默认 strict、types 空数组一起砸过来，建议单独分支跑 noEmit 对一下耗时，编辑器可换 Native Preview 扩展试手感，别急着全队切换。
pubDatetime: 2026-04-28T00:00:00Z
tags: ["TypeScript", "编译器", "工程效率", "CI", "工具链"]
---

微软把 TypeScript 编译器用 Go 重写了一版，Beta 挂在 native-preview 这个包里，命令行新入口叫 tsgo。官方口径是常见项目里能比 TS 6 快一大截，听着像给大型仓库和 CI 减负用的。

我自己更在意的反而不是「快多少倍」，而是升级会连着 6.0 那套默认项一起砸过来。strict 默认开、types 默认空数组这些，老项目要是从来没跟过 6，一次性切过去，报错量可能直接把人劝退。

比较稳妥的做法是先单独拉个分支，把 dev 依赖装上，用 npx 跑 tsgo 加 --noEmit，对着 CI 的时间戳比一比，看是编译瓶颈还是别处在拖后腿。本机写代码的话可以装 VS Code 那个 TypeScript Native Preview 扩展，感受一下补全和检查的延迟有没有变舒服。机器内存吃紧的话，CLI 还有单线程模式可以试。

别把它当成全队必须今天切的军令状，多一把尺子量一下类型检查成本，够了。

#全栈成长之路
