---
title: 营销站挂着 React，就为了开个侧边栏？
description: 有团队把 Astro 营销站从 React 和 Ark UI 迁到原生 Web Components，gzip 后 JavaScript 少了约 100KB，移动菜单、主题切换、下拉和侧栏弹层功能都在。他们用 nanotags 包了一层 Custom Elements，核心不到 2.5KB，配合 nanostores 做响应式，无障碍对着 W3C 规范自己写 attachment。
pubDatetime: 2026-06-01T00:00:00Z
tags: ["性能优化", "Web Components", "Astro", "前端架构", "营销站"]
---

有个团队把 Astro 营销站从 React 拆了，换成原生 Web Components，JavaScript 少了差不多 100KB，侧边栏、主题切换、下拉菜单这些交互一个没少。

我第一反应是：不至于吧？后来想想，自己赶工期时也干过——顺手上 React，就为了几个弹窗和菜单，整包 runtime 全站背着跑。营销页八成是静态 HTML，真正要 JS 的可能就四五个组件。

他们本来用 Ark UI，换框架时 Svelte、Solid 都在名单里，后来干脆问：能不能连框架都不要？Custom Elements 浏览器早就稳了，Astro 构建时吐 HTML，客户端只做升级，中间不夹一层虚拟 DOM。

手写 Web Component 又烦又容易漏监听，所以他们搞了个 nanotags，核心 gzip 不到 2.5KB，props 走 nanostores，refs 有类型，组件卸载自动清监听。无障碍对着 W3C 规范写 attachment，据说键盘和读屏体验没退步。

纯展示型落地页我会先试试不挂 React；真要交互就上 Web Component 或小库，别为习惯多背几十 KB。

#全栈成长之路
