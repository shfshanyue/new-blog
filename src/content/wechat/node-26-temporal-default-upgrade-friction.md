---
title: Node 26 来了，Temporal 默认开，我为啥还劝你先缓一缓
description: Node 26 Current 已发布，Temporal 终于默认开启，跟 Date 纠结构造时区的新手和老炮都能少踩一点坑。V8 14.6 带来 Map getOrInsert 等零碎拼图，内置 HTTP 客户端随 Undici 8 演进，边界行为也要重新摸底。semver-major 清理了 stream 老路径和 writeHeader 一类边角 API，升级别只靠改版本号。建议本地与 CI 全量跑测，并把 gcc、Python 等工具链版本先对齐，免得测试绿、部署红。
pubDatetime: 2026-05-15T00:00:00Z
tags: ["Node.js", "Temporal", "升级", "运行时", "工程实践"]
---

你今天把线上 Node 升到 26 了吗。可能还没，但我估计过几天 CI 里就有人偷偷改了镜像标签。

这版最明显的变化，是 Temporal 直接默认可用，不用再去翻文档找开关；跟老 Date 掐架久了的人，至少在 REPL 里可以先试试把时区和日历那块写得像人话一点。

V8 14.6 还顺带点了几笔零散能力，比如 Map 上那种 getOrInsert 的写法——业务里不一定天天用，但写基础库的同事多半会顺手升级一波依赖。

内置 HTTP 客户端也跟着 Undici 8 往前走了一截，要是你的服务边界刚好卡在超时、重试、连接池这些细节上，升级后更值得一轮接口回归。

真正肉疼的是 semver-major：一些老的 stream 子路径、以及 http.Server 的 writeHeader 这种边角 API 被清掉了。想上 26，别只看发布会爽文，建议把单元测试和集成测跑全，顺带把构建机的 gcc 版本和 Python 版本对齐一下，避免本地能编译、CI 一跑就炸。

我还在 Node 22 上混日子也挺自在；如果你要尝鲜，就把它当成一次兼容性体检，别指望无痛空降。

#全栈成长之路
