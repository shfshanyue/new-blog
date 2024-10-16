---
title: Cursor 使用技巧
draft: true
pubDatetime: 2024-09-25T22:44:00Z
description: 如何使用 cursor
---

## Review Cursor

在使用 Cursor 编辑器时，有时会遇到一个棘手的问题：`Tab` 键自动补全或 `Chat` 功能可能会意外删除关键的代码行，导致程序出错。这种情况下，仅凭肉眼进行 `Code Review` 往往难以发现哪一行代码被删除，以及是否影响了核心逻辑。

为了解决这个问题，可以利用 Cursor 的 `Review` 面板功能，实时检查代码，及时发现并修复潜在的错误。

![Review Panel in Cursor](https://static.shanyue.tech/images/24-09-25/clipboard-9330.05385a.webp)

此时我们先假设每次 Commit 都由若干个小的功能组成。建议采用以下两步 Code Review 策略：

1. 每次小功能完成后：每当完成一个小功能时，在 `Review` 面板中选择 `Review Working State` 选项。这将对工作区的代码进行全面检查，检查无误后，使用 `git add` 命令将更改添加到暂存区。
2. 提交前的最终审查：在执行 `git commit` 之前，切换到 `Review` 面板，选择 `Review Diff with Main Branch` 选项（手动控制 Main 分支至 HEAD）。这一步将对比暂存区的代码与主分支的差异，确认无误后，再执行 `git commit` 提交更改。

通过这种双重检查机制，可以显著提高代码质量，减少由于意外删除或修改导致的错误。
