---
title: 写个浏览器插件，何必还跟 webpack 较劲
description: 写浏览器扩展往往要折腾多套入口和热更新。AddFox 基于 Rsbuild，支持 Chromium 和 Firefox 与主流前端框架，内置 content UI 注入方案。跑 addfox dev --debug 可把扩展运行时错误直接打到终端并附带 Agent 可读上下文，适合想复用网页组件、又不想从零拼配置的团队。
pubDatetime: 2026-06-18T00:00:00Z
tags: ["浏览器扩展", "AddFox", "Rsbuild", "前端工程", "AI 编程"]
---

写浏览器扩展这件事，很多人一听就头疼。background、content script、popup 各搞一套入口，HMR 基本别想了，改一行代码 reload 好几遍。

最近看到 AddFox，底层是 Rsbuild，一行 npx addfox create 就能脚手架起手。Chromium 和 Firefox 都支持，React Vue 随便选，content script 那边甚至给你封装好了 ShadowDOM 和 Iframe 注入。

我觉得最巧的是它对 AI 友好这块。跑 addfox dev --debug，扩展里报错直接打到终端，还带完整 stack 和一段给 Agent 读的 prompt，Cursor 里可以直接丢过去修。项目里还会生成 llms.txt 和 meta.md，Agent 不用瞎猜你的项目结构。

作者是 VideoRoll 插件的开发者，Chrome 和 Edge 商店 3 万多用户那个。自己踩过坑才做的工具，可信度还行。

你要是想把网页里现成的组件复用到扩展侧，又不想从零拼 webpack boilerplate，可以花半小时试一把。

#全栈成长之路
