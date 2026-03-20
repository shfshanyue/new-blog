---
title: Brainstorming Skill 更新后的两个注意点
description: Brainstorming Skill 更新后会自动写入 spec 并在设计结束后自动提交。若你介意这两个行为，可以用 .gitignore、规则限制和权限配置三种方式来规避自动提交风险。
pubDatetime: 2026-03-20T00:00:00Z
tags: ["AI", "Brainstorming", "Cursor", "AMP", "工作流"]
---

使用 Brainstorming Skill 需要注意了，它最近更新了一版。如果你使用 pnpm skill 命令更新了该 Skill 的话，它会有以下两个变动：

1 它会自动写入 spec，并自动指定了自己的一个目录

2 它会在每次设计完之后进行自动提交

第二个还是会稍微有点不舒服，如果对这两个变动比较介意的话，特别是在公司限制比较多的情况下，有以下几种处理方式：

1 将 docs 写入 spec 的地址放在 .gitignore 或者 .git/info/excluede 中，或者让它每次写入自己的 notion 中，见我以前文章

2 在 agent.md 中禁止它 git commit 和 git push。但最好是在 Cursor 的 Hooks 或者 Cloud Code 的 Hooks 里去禁止提交。我写了一个 cursor hook 去禁止，我把代码放在了我的 github

更新的文档节选在下面，有兴趣的也可以直接翻一翻 skill 文档去看看

## After the Design

- Write the validated design (spec) to docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md
  - (User preferences for spec location override this default)
- Use elements-of-style:writing-clearly-and-concisely skill if available
- Commit the design document to git

#全栈成长之路
