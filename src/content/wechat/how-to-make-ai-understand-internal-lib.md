---
title: 让 AI 真正懂你的内部库：最有效的三件事
description: 项目里有内部库时，AI 很容易靠猜然后瞎写。做一个专门的 skill，讲清主 API 和注意事项，再把内部库代码拉到本地并写明路径，AI 就能直接查实现，写出来的东西会靠谱很多。
pubDatetime: 2026-03-19T00:00:00Z
modDatetime: 2026-03-30T00:00:00Z
tags: ["AI", "工程化", "内部库", "Cursor", "知识库"]
---

AI 如何用好内部库，我最推荐的做法就是给内部库做一个 skill，再把库的代码放到本地，再在 AGENTS.md 里能指到具体路径让 AI 能够检索源码。

1 生成一个内部库专用的 skill，写清两件事：主要 API 和注意事项

2 把内部库代码下载到本地，让 AI 能够直接访问到代码库。目标是让 AI 能从调用点一路跳到实现，遇到问题能直接去翻真实代码，而不是凭经验瞎猜。

3 在 AGENTS.md 里写明本地代码地址和关键入口文件（如果 AGENTS.md 置于版本控制中，则放在 AGENTS.LOCAL.md 中做个性化，类似 .env.local 一样）比如内部库放在哪个目录，入口文件在哪，核心模块在哪，常见问题该去哪个文件看。

做完这三步，AI 的输出会明显从“像在编”变成“像在照着你们的代码写”。

补充一条，Next.js 升级到 16.2 之后，已经把 docs 也打进了包内部。这样我们在 pnpm install 的时候，docs 也会一起安装下来。https://nextjs.org/blog/next-16-2-ai#ai-ready-project-setup

所以在 AGETNTS.md 里，直接让 AI 去检索那个目录就行，这同样是让 AI 更懂内部库的一种方式。以下是 Next.js 官方脚手架生成的 AGENTS.md 源码的一部分

Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

#全栈成长之路
