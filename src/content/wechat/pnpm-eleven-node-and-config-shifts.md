---
title: 想升 pnpm 11？先把 CI 那台机器的 Node 翻出来看一眼
description: pnpm 11 砍掉 Node 20 及以下，本体变纯 ESM；默认新包要晾满一天才给装，exotic 子依赖默认拦；构建脚本相关的配置收成 allowBuilds。非登录类设置别指望全塞在 .npmrc 里了，该进工作区 yaml 或全局 config。全局安装改隔离目录，装起来更像各自独立的小项目。
pubDatetime: 2026-05-17T00:00:00Z
tags: ["pnpm", "Node.js", "包管理", "工程化", "供应链安全"]
---

pnpm 又抬了一个大版本，我一眼扫过去最扎心的其实不是功能列表，是门槛：没切到 Node 22 的话先别碰，装都装不上。

更狠的是默认策略也变了，minimumReleaseAge 默认 1440 分钟，等于刚发出来的包你得让它在注册表里躺够一天才给你装；blockExoticSubdeps 也默认开，依赖链上那些奇奇怪怪的子依赖更容易直接被挡在门外。

以前那套 onlyBuiltDependencies 之类的名单，这次被一锅端，换成 allowBuilds，大意就是谁允许跑 postinstall 你一张张写清楚，不写的就按新默认走。

习惯层面也挺折腾：pnpm 自己的配置不再混在 .npmrc 里赖着不走，要往工作区的 yaml 或者家目录的全局 config 挪；以前抄 npm 开头的环境变量，也得改成 pnpm 前缀那套，CI 脚本里我最怕这种看起来没报错其实读错配置的问题。

好消息是 store 侧换成 SQLite 做索引，冷安装 syscall 会少一些；全局 pnpm add 也更隔离，不太会因为 peer 互相打架把整台机器搞成玄学。今晚要升级的话，真不如先把跑 install 那台机器的 Node 版本截图发群里，比上来就改锁文件省心。

#全栈成长之路
