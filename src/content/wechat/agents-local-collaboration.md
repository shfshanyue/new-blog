---
title: 团队用 agents.md，个人规则放 agents.local
description: 和同事一起维护项目时，仓库里往往已有共享的 agents.md。若每人还想保留自己的约定，可像环境变量那样：另建 agents.local.md，由 agents.md 引用说明，并把本地文件加入 .gitignore，共享与私有不打架。
pubDatetime: 2026-03-21T00:00:00Z
tags: ["Agent", "协作", "Git", "开发规范", "Cursor"]
---

在公司和同事协同维护一个项目的时候，项目里有可能已经有一份 agents.md。

如果每个人都想再维护一套自己的规则，可以借鉴环境变量管理的思路：再维护一个 agents.local.md，让 agents.md 去参考这个文件，再把 agents.local.md 放进 .gitignore 里。

这样仓库里仍是大家共用的约定，local 多出来的那份只影响自己，互不干扰。

#全栈成长之路
