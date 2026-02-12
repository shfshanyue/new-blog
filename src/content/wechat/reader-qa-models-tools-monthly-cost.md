---
title: 答读者问：用的什么大模型和编码工具，每月花多少，CLI 还是编辑器？
description: 分享目前主要用的 amp（命令行）和 Cursor（编辑器）、订阅成本约每月 15 美金、主力模型 Opus 4.6 与 Cursor Sonet/Auto 的分工，以及改完代码在 Cursor 里审一遍再提交的流程。
pubDatetime: 2025-02-12T00:00:00Z
tags: ["AI 编程", "Cursor", "amp", "大模型", "工作流"]
---

有读者问：用的什么大模型、什么编码工具，每月大概花多少钱，平时是 CLI 还是编辑器？简单答一下。

我目前主要用两个：amp 和 Cursor。amp 是命令行，Cursor 是编辑器。这两个都是去年订阅 Lenny Newsletter 之后用上的，当时 170 美金一年，现在价格有没有变不太清楚。摊下来每月大概 15 美金。

要是后面过期了，我可能会续订 Lenny Newsletter 再配上 Claude Pro，一年大概 400 美金，折下来每月 33 美金左右。

因为 amp 一直用最新的编程模型，所以我主力是 Opus 4.6，效果很好，返工很少。其次就是 Cursor 的 Sonet 4.5 和 Auto。

复杂一点的需求交给 Opus 4.6，好钢用在刀刃上。简单的直接让 Cursor 的 Auto 或 Sonet 4.5 做。有时候只是读代码、问几句，也用 Cursor 的 Auto。

所以用 CLI 还是编辑器，主要看我想用哪个模型。但日常是两边都开着：amp 改完，我会在 Cursor 里把代码过一遍，人工审一下。有看不懂的地方就在 Cursor 里再问一嘴，没问题就点「Generate Commit Message」提交。需求比较复杂的时候，还会用 amp 做一遍 code review，它自带的 code review skill 我用着挺顺手。

至于为什么不全用 amp，主要是因为穷。

#全栈成长之路
