---
title: 试了试 Cursor 云端 Agent 做 Web 前端，流程挺顺
description: 用 Cursor 云端 Agent 开发 Web 前端的真实流程：连 Git 仓库、在 Ubuntu 里配环境（支持 Dockerfile、环境变量）、按需求自动建分支、截屏录屏看效果、最后点一下就能 Request PR。做移动端和桌面端能否配好环境还不确定；用的是 Opus 4.6，成本高，只浅尝了一下。
pubDatetime: 2026-03-02T00:00:00Z
tags: ["Cursor", "云端 Agent", "Web 开发", "AI 编程", "开发流程"]
---

最近用 Cursor 的 Cloud Agent 跑了一轮 Web 前端开发，把流程摸了一遍。

第一步是跟仓库打通，接 GitLab 或 GitHub 都行。第二步是配环境：Agent 跑在 Ubuntu 里，也可以用 Dockerfile，它会根据你当前项目自动帮你把环境跑起来，配环境时有可能要你贴一份环境变量文件。

真正做需求的时候，每做一个新需求它会自动新建一个分支，然后在那条分支上干活。过程中会给你截屏、录屏，方便你看效果；你也可以切到 Desktop 视图去点浏览器、自己操作。做完会有一个 Create PR 的入口，点 Request PR 之类就能把 PR 提出来。

整体走下来和本地开发的节奏差不多，该有的步骤都有，不用自己切分支、跑命令、录屏，体验比较顺。至于拿它开发 Android、iOS 或桌面应用会怎样，环境能不能正确配好，我还没试，不好说。

Cloud Agent 用的模型是当前最顶的 Opus 4.6 high，花费会高一些，我就浅尝辄止了。如果你对成本不太敏感，可以试试看。

#全栈成长之路
