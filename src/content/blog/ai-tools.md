---
pubDatetime: 2025-04-02T10:00:00Z
title: 我常用的 AI 工具及使用场景
description: "分享几款日常使用的 AI 工具，它们在不同场景下的应用和个人使用体验"
---

> 与 2025-05-31 更新，新增了 `grok`

> 于 2025-04-07 更新

最近两年，我逐渐养成了使用各种 AI 工具的习惯。简单记录一下我所使用的 AI 工具，希望对你也有参考价值。

## 搭配组合

目前的搭配组合（20250531 组合），总的来说是 `Grok` + `Cursor` + `豆包`。又可根据设备进行区分：

- 手机上，使用 `Grok` 的 App
- 电脑上，使用 `Cursor` 和 `Grok` 的网页版
- 浏览器，使用 `豆包` 浏览器插件

相比 20250407 组合，`Grok` 的回答更准确更有逻辑，而且中文支持友好，DeepSearch 功能强大，并且免费。因此使用它替换掉了以前的 `Kimi` 和 `DeepSeek`。

## 过期搭配组合

20250407 组合，总的来说是 `Kimi` + `DeepSeek` + `Cursor` + `Claude` + `豆包`。又可根据设备进行区分：

- 手机上，使用 `Kimi` 和 `DeepSeek` 的 App
- 电脑上，使用 `Cursor` 和 `Claude`、`Kimi` 和 `DeepSeek` 的网页版
- 浏览器，使用 `豆包` 浏览器插件

现在，分别说下每个工具的特点和使用场景。

## Grok

## Kimi

`Kimi` ~~是我平时用得最多的 AI 助手~~，主要用来解决一些生活中的小问题：

- 电影推荐：比如最近看了几部 Kimi (+ ChatGPT) 根据时间悖论推荐的电影
- 书籍推荐：比如最近推荐了如何写作的书籍，以及一些科幻小说
- 乱七八糟的生活百科全书：比如做饭、驾考、生活常识、古生物（比如恐龙）等

在 kimi 的网页端，配合右侧的搜索结果栏，也可以当做一个高级的搜索引擎使用。

![](https://static.shanyue.tech/images/25-04-07/clipboard-1986.f08246.webp)

## DeepSeek

遇到更专业的问题，我通常会选择 `DeepSeek`。比如：

- 投资建议
- 写作建议

有时候我会把同一个问题同时问 `Kimi` 和 `DeepSeek`，然后对比它们的回答，这样做能让我从不同角度理解问题。

（但是因为 DeepSeek 经常服务器异常，而且只要不在当前页面盯着它，它就给你中断，因此还是 Kimi 用的稍微多一些）

![](https://static.shanyue.tech/images/25-04-07/clipboard-9391.265c64.webp)

## Cursor：P7+ ！！！！

个人感觉目前 Cursor 至少有 P7 的水平。

我是从 2023 年 7 月开始使用 Cursor 的，当时还处于早期阶段，极其不稳定，而且经常引出 Bug。那时候处于一种可用但不好用的状态。

后来随着版本迭代，Cursor 逐渐稳定下来，再加上 `Claude Sonet 3.7` 的加持，功能越来越强大，现在已经成为了我日常使用频率最高的工具。

基本上可以说，我现在 90% 的代码都是用 Cursor 写的。另外，也结合基于 `.cursor/rules` 的敏捷工作流，更好地来与 cursor 写作。

以前也总结过多篇关于 Cursor 的文章，感兴趣的可以看这里：

- [MCP简介：从浏览器截图的自动化说起](https://blog.shanyue.tech/posts/mcp-browser-automation/)
- [Cursor 使用指南](https://blog.shanyue.tech/posts/cursor/)：这是九月份的文章，当时 Cursor 还处于早期阶段，现在已经迭代了很多版本，但基本功能和用法是类似的

## Claude

虽然 `Cursor` 已经能满足大部分编程需求，但我还是经常使用 `Claude` 的免费版（`claude-sonet-3.7` 模型）处理一些特定问题：

- 与当前项目无关的编程问题
- 需要讨论算法思路
- 跨项目的代码设计问题

`Claude` 每天有使用限额，但回答质量通常很高，尤其是在解释算法或讨论编程最佳实践时表现出色。

对于那些不需要完整项目上下文的编程问题，`Claude` 往往能提供清晰的解释，从而可以帮助给 `Cursor` 省一点 `fast request` 的次数。

而且不知道是不是我的错觉，感觉 `Claude Sonet 3.7` 网页端的回答比基于 `Claude Sonet 3.7` 的 `Cursor` 的回答更智能一些。

## 豆包：浏览器插件

豆包主要集中在浏览器插件使用：

- 翻译：比如翻译网页、翻译 PDF 以及划线翻译
- 举例：这是我自定义的划线的 prompt，用以在浏览技术文档时，使用它举例，方便更快速理解
- 总结：比如总结网页内容
- 问答：比如基于网页内容进行提问

![](https://static.shanyue.tech/images/25-04-07/clipboard-3045.f7ee66.webp)

## ChatGPT Plus：用过但已不再续费

之前一段时间我是 `ChatGPT Plus` 的付费用户，主要使用它的 `Canvas` 功能。不过，随着其他 AI 工具的发展，我最近已经停止续费。

我发现日常问题有 `Kimi`，专业问题有 `DeepSeek`，编程有 `Cursor` 和 `Claude`，基本上能覆盖我的所有需求。在这种情况下，继续付费使用 `ChatGPT Plus` 就显得不那么必要了。

## 总结

不同的 AI 工具有各自的特点和适用场景，关键在于根据任务选择合适的工具。通过组合使用这些工具，我们能在不同情境下获得更精准的帮助。

AI 技术正以惊人的速度发展。今天觉得很厉害的工具，可能在半年后就已经落伍。保持开放的心态去尝试新工具，但也别盲目追逐热点，找到真正适合自己工作流程的才是最重要的。毕竟工具再智能，也只是辅助我们思考和创造的手段，而非目的本身。
