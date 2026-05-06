---

## title: Plan 之后：个人项目偏分支，公司项目偏 worktree

description: 生成 Plan 后可选新建分支或 git worktree。个人项目倾向切分支、执行 Plan、多 commit、Review、PR；公司项目因并发需求与 hotfix 更常用 worktree。顺带提到 worktree 的目录与依赖成本，以及 pnpm v11 共享 node_modules 的缓解。
pubDatetime: 2026-05-06T00:00:00Z
tags: ["Git", "工作流", "Plan", "分支", "worktree"]

在生成 Plan 之后，通常有两种开发方式可以选择：一是新建分支，二是新建 worktree。

我个人在个人项目中更倾向于新建分支的方式，按照切换分支、执行 Plan、提交多个 commit、Review 再到 PR 的流程来推进。主要有以下几点原因：

操作繁琐：需要新建一个与原仓库完全相同的目录，略显麻烦，特别是对于特别大的仓库。

环境配置：每次都要重新安装依赖环境，比较耗费精力。

磁盘占用：存在 node_modules 的问题，会产生大量额外的磁盘占用。虽然 pnpm v11 已经支持多份 worktree 共享全局 node_modules，从而解决了这一问题。

但最根本的原因在于，我基本上不会在个人项目中并发开发两个不同的功能需求。通常我会专注于一个较大的需求，开一个分支做完再说，不会同时推进两条线。

而在公司项目中，使用 git worktree 就相对较多：

1. 同时并发开发不同需求比较多，特别是在注重 code review 的团队，一个小时开发完 feat-a，而 团队多人 code-review 甚至需要花费比开发该需求还多的时间。这个时候多个需求并发开发非常常见。
2. 在开发 feat-x 的时候突然有 bug 指过来需要开发 hotfix-y
