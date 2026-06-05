---
title: 提交按钮能不能点，让 CSS 自己数清楚
description: 纯 CSS 用 nth-child 的 n of 语法配合 has，能数出表单里已填了几项：文本看 placeholder 还在不在、单选看 checked、下拉看必填 option 有没有选中。凑够 3 项再放开提交按钮或给提示，多步表单比单靠 invalid 更顺手；Safari 部分场景可能抽风，复杂校验仍要 JS 和 aria-live 来兜底。
pubDatetime: 2026-06-05T00:00:00Z
tags: ["CSS", "表单校验", "前端", "渐进增强", "nth-child"]
---

前两天看到一种写法，纯 CSS 就能判断表单里已经填了几个字段，不用先绑一堆 onChange。

思路是 nth-child 里的 n of 语法。比如你要求至少填 3 项，就写第 3 个符合条件的 field。每个 field 用 has 挂上已填写的状态：文本框看 placeholder 还在不在，单选用 checked，下拉看必填 option 有没有被选中。

填到第三项时，选择器命中，顺带把提交按钮从灰色放开，或者旁边提示可以交了。写法大概是「第 3 个带 has 的 field」，里面挂上各类已填状态。

这比简单用 invalid 更有用。多步表单、动态增删行的时候，你需要的是凑够几个，不是某一个格式不对。

当然也有坑。Safari 在部分场景下状态选择器可能抽风，上线前还是得对着目标浏览器点一遍。复杂表单别指望全靠 CSS，无障碍提示还得配合 aria-live。

我自己不会把所有校验都扔给 CSS，但凑够 N 项再解锁提交这种前置检查，省掉不少 JS 样板代码，挺香。

#全栈成长之路
