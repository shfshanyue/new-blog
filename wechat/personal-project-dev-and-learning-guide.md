---
title: 个人项目修炼指南：开发规范、读源码与 AI 协作
description: 从项目选择、开发与构建规范、源码阅读到 AI 开发环境与 Prompts 设计，一套可落地的个人项目学习与精进路径。
pubDatetime: 2025-01-30T00:00:00Z
tags: ["个人项目", "开发规范", "源码阅读", "AI 协作", "学习路径"]
---

优先选自己控制权强的项目练手，最好是个人项目，方便按自己的想法实践与迭代。

1 Vue 项目可以跟着 Anthony Fu（antfu）的 Vue 相关 skills 来打磨。通读一遍，逐条对照自己的项目做优化，并弄懂每条建议背后的考量。

2 React 或 Next.js 项目可以对照 Vercel 维护的最佳实践文档。同样通读后把条目落到项目里，并理解每一项优化是如何生效的。

3 构建与工具链：使用 Vite、pnpm 相关的 skills，通读一遍，按条目优化构建、脚本与依赖管理，并搞懂每条优化具体改进了什么。

4 源码阅读：用 AI 带着通读项目依赖的源码，效率更高。先整体通读，再挑一部分细读，最后问 AI「这段源码做了哪些性能或架构上的优化？」阅读时间按项目复杂度来，一般通读不超过两小时。优先选核心技术栈的源码，例如 vue-query、VueUse、复杂业务组件等（按实际技术栈取舍）。


5 AI 开发环境：从工程与协作角度，看看 Vercel 系项目（如 vercel/next.js、vercel/turborepo）如何维护 AI 相关配置，例如 agents.md、skills、Cursor rules 等，借鉴他们的组织方式与约定。

6 AI 工具 Prompts：从业务与使用角度，研究各类 AI 工具的 prompts 设计，例如 Claude Code、Meltbot、Auto Claude 等。理解他们如何描述任务、约束输出、设计 few-shot，再反哺到自己日常的 prompt 使用里。
