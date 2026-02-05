---
title: 会提问，才能把 AI 当成十倍工程师
description: GitHub 上有个著名的仓库叫 How to ask questions the smart way，这条原则在 AI 时代依然适用。不会提问，AI 再强大也帮不上忙。今天分享几个来自 Amp 官网的实战 prompt 案例，教你如何精准指挥 AI 完成复杂任务。
pubDatetime: 2026-02-04T00:00:00Z
tags: ["AI", "提示词", "开发效率", "工程实践"]
---

今天分享几条我经常使用的提示词，不过更适合个人项目，公司项目需谨慎。

一、 运行命令 pnpm lint，然后修复所有异常。

这个命令是消耗 token 大户，循环运行，直到所有异常都修复。同理，这个命令也可以换成 pnpm build/test。

也可以：

1. 检查每个页面的 i18n 是否齐全，并修复。
2. 使用 @seo audit 修复每个页面的 SEO
3. 使用 @react-best-practices 对每个组件进行 code review 并修复

二、 Plan 模式：运行命令 pnpmx npm-check-updates -u 更新所有依赖，阅读官方升级文档，并升级，最后 pnpm test/build 进行检查。

首先说明，即使有 AI 的帮助，这条命令也是非常危险的。但是使用 AI 进行升级，它会按照优先级以及必要性排序，让你选择一些必要的升级以及建议。

这个命令也是消耗 token 大户。

三、Plan 模式：重新设计合理的文件目录结构，按照 xx 分层的方式进行代码组织，并使用统一风格，如 camelCase 或 snake_case。

比如 next.js app router 的官方文档有几种推荐的目录结构组织方式，可以提供一种给 AI 进行重构。

四、Plan 模式：请基于代码组织方式进行重构，提取可复用逻辑，并将所有模块命名更加语义化。

五、Ask 模式：请提出对本项目 产品功能、代码质量、性能以及 UI 的一些建议。(每次只提一个方面)

#互联网大厂面试
