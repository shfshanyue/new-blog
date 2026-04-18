---
title: pnpm 11 beta 这一版，感觉是在给依赖安装做体检和减负
description: pnpm v11.0.0-beta.8 里 CLI 输出更干净、peer 问题会引导你去跑 pnpm peers check；store 侧把 manifest 塞进索引、package index 换成 SQLite 并走 WAL，减少小文件和反复读 package.json 的 IO；minimumReleaseAge 默认 1440 分钟让新包多等一天，全局安装也更隔离。大仓库和 CI 常跑 install 的人值得扫一眼默认值，别等线上装包突然变慢才回头查配置。
pubDatetime: 2026-04-18T00:00:00Z
tags: ["pnpm", "包管理", "Node.js", "供应链安全", "工程效率"]
---

pnpm 11 的 beta 出来了，我的第一反应不是「又多了几个 flag」，而是它在把装依赖这件事往更工程化、也更防守的方向推。

先说两个对我日常最直观的点。跑脚本时输出更干净了，会尽量用一行 $ command 把事说清楚，stdout 也更适合接管道，不会被一堆前缀信息刷屏。peer 依赖不对劲时，也不会把整棵树糊在脸上，而是让你去跑 pnpm peers check，卡住时至少知道下一步该干啥。

更底层的是 store：依赖稳定从全局虚拟 store 链接，manifest 进索引，少读 package.json。更狠的是 package index 换成 SQLite，小 JSON 合并成一个带 WAL 的数据库，并发读元数据 syscall 少一些，大仓库和 CI 里反复 install 更舒服。

默认配置也更「稳」了，比如 minimumReleaseAge 默认给到 1440 分钟，新发包要等一天才更容易被解析到，算是给供应链踩雷留缓冲。你要尝鲜就自己改回去。全局安装也更隔离，每个全局包有自己的目录和 lockfile，互相不容易被 hoist 和 peer 依赖打架牵连。

pnpm 继续在抠 IO、抠输出、抠并发访问这些细节，同时也把默认策略写得更保守一点。

#全栈成长之路
