---
title: Streamdown 简介：更适合流式输出的 Markdown 渲染
description: 我以前主要用 react-markdown，但内容开始做流式输出后，未闭合的代码块、列表会让渲染很别扭。迁移到 Streamdown 之后体验顺很多，还自带 math、code 等插件，基本开箱即用。
pubDatetime: 2026-03-18T00:00:00Z
tags: ["React", "Markdown", "前端", "AI", "开发效率"]
---

如果你写过 AI 对话类界面，就会发现：Markdown 一旦变成流式输出，很多细节都不再理所当然。

我以前用得最多的是 react-markdown。单次渲染没问题，但当模型一边吐字一边补全时，列表、引用这些结构往往影响不大，但是像图片、链接、代码块这些包含闭合式标签的结构经常处在“还没写完”的状态，页面会抖、样式会乱，体验不太稳。

后来我陆续把项目里相关的渲染都迁到了 Streamdown。它就是为流式的 Markdown 做优化：哪怕块级结构还没闭合，也尽量给出合理的展示，不会让 UI 一直处在半崩的中间态。

我还很喜欢的一点是插件生态比较省心。比如 math、code highlight、gfm 这类常用能力直接就能上手，不用自己拼一堆零散的 remark rehype 组合拳。做 AI 输出展示时，少折腾很多。

如果你也在做流式消息渲染，我建议可以把 Streamdown 当成 react-markdown 的替换项试试。迁移成本通常不高，但效果往往立竿见影。

#全栈成长之路
