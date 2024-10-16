---
title: 我开发的一些开发者小工具
pubDatetime: 2024-10-16T10:00:00Z
description: 介绍了一系列自主开发的开发者工具，包括 IEEE754 浮点数转换、UTF-8 编码转换、图片处理工具等，旨在解决开发中遇到的问题并深入理解技术概念。
---

# 我开发的一些小工具

在 2020 年，我辞职在家，每天都有大把时间。于是，我开始开发一些与开发相关的小工具，目的是解决开发中遇到的问题，或者帮助更深入地理解某些技术概念。

每天写写小工具，时间就这样一天天过去，回想起来，这段经历其实挺有意思的。

刚开始时，这些工具的 UI 确实比较简陋。不过随着时间推移，我也在不断改进它们的外观。虽然现在看来可能还是不够精美，但已经有了很大进步。

说实话，这些工具的用户引导和文档都很少，更像是我自己的一个小天地。通过 Google Analytics 的数据，我发现有些工具的使用者可能只有我自己，比如[微图床](https://devtool.tech/gallery)。但正因为我自己在用，即使最近添加新工具的频率减少了，我也一直在维护它们。

令我感到欣慰的是，我把其中一些工具提交到了阮一峰老师的博客，很多小工具都得到了他的推荐。这对我来说是一种莫大的鼓励。

## 一些与深入原理相关的工具

这些工具旨在帮助开发者更深入地理解一些基础概念和底层原理。

### [IEEE754 浮点数转换](https://devtool.tech/double-type)

这个工具可以帮助你理解 IEEE 754 标准中双精度浮点数的内部表示。它能将十进制数转换为对应的二进制表示，并清晰地展示符号位、指数位和尾数位。这对于理解计算机如何处理浮点数非常有帮助。

根据 [IEEE754](https://en.wikipedia.org/wiki/IEEE_754) 标准，`Infinity` 的浮点数转换为：指数位全为 1，尾数位全为 0。

以下是 Infinity 的浮点数转换：

![Infinity 的浮点数转换](https://static.shanyue.tech/images/24-10-13/clipboard-4215.a7ecb1.webp)

根据 [IEEE754](https://en.wikipedia.org/wiki/IEEE_754) 标准，`0` 的浮点数转换为：符号位为 0，指数位全为 0，尾数位全为 0。

以下是 0 的浮点数转换：

![0 的浮点数转换](https://static.shanyue.tech/images/24-10-13/clipboard-0806.71aa99.webp)

### [UTF-8 编码转换](https://devtool.tech/utf8)

UTF-8 是一种可变长度的字符编码，这个工具可以帮助你理解 Unicode 字符是如何被编码成 UTF-8 的。你可以输入任何 Unicode 字符，工具会显示其 UTF-8 编码的二进制表示，让你直观地看到编码过程。

![UTF-8 编码转换示例](https://static.shanyue.tech/images/24-10-16/clipboard-9015.e279b0.webp)

### [base64 编码转换](https://devtool.tech/base64)

Base64 是一种常用的编码方式，特别是在处理二进制数据时。这个工具不仅可以帮助你理解 Base64 编码的原理，还提供了便捷的编码和解码功能。它对于处理需要在文本环境中传输二进制数据的场景特别有用。

![base64 编码转换示例](https://static.shanyue.tech/images/24-10-16/clipboard-2684.f3dea6.webp)

### [文件类型检测](https://devtool.tech/filetype)

这个工具可以帮助你理解如何通过文件的魔数（magic number）来判断文件类型。你可以上传一个文件，工具会读取文件的二进制数据，并根据魔数判断文件类型。这在处理未知文件或验证文件类型时非常有用。

比如，`JPEG` 是因为它的 Magic Number 为 `FF D8 FF DB`

![文件类型检测示例](https://static.shanyue.tech/images/24-10-16/clipboard-4722.45bad5.webp)

## 图片相关

图片处理是 Web 开发中的一个重要方面，以下是一些与图片处理相关的工具。

### [微图](https://devtool.tech/tiny-image)

这是一个快速的图片压缩工具，可以帮助你减小图片文件的大小，而不会显著降低图片质量。

它支持多种图片格式，并且没有文件大小或数量的限制。这个工具对于优化网站加载速度特别有帮助。

最主要的是它借助于前端实现，无需服务器成本，所以你不需要担心隐私问题。它的实现方式与 [squoosh](https://squoosh.app/) 类似，都是借助于 [WebAssembly](https://webassembly.org/) 实现。

![微图示例](https://static.shanyue.tech/images/24-10-16/clipboard-5192.d4318d.webp)

### [微图床](https://devtool.tech/gallery)

这是一个个人图床工具，允许你将 GitHub 仓库用作个人图床。它提供了简单的上传和管理功能，让你可以方便地在文章或网页中引用图片。对于经常需要在线分享图片的开发者来说，这是一个非常实用的工具。

![微图床示例](https://static.shanyue.tech/images/24-10-16/clipboard-3754.4cf7fe.webp)

### [图片分享](https://devtool.tech/image-share)

这个工具可以帮助你快速生成带有文字的图片，适合用于社交媒体分享或创建简单的海报。它简化了图文组合的过程，让你无需使用复杂的图像编辑软件就能创建吸引人的图片。

![图片分享示例](https://static.shanyue.tech/images/24-10-16/clipboard-0477.a2915f.webp)

### [图片占位符](https://devtool.tech/placeholder)

这是一个图片占位符生成工具，可以快速创建自定义尺寸和颜色的占位图片，非常适合在开发过程中使用。它可以帮助你在实际图片还未准备好时，保持页面布局的完整性。

![图片占位符示例](https://static.shanyue.tech/images/24-10-16/clipboard-0895.d25b6d.webp)

## 编码与加密

在 Web 开发中，我们经常需要处理各种编码和加密。以下是一些相关的工具：

### [URL 编码](https://devtool.tech/url-encode)

这个工具可以帮助你进行 URL 编码和解码，对于处理包含特殊字符的 URL 非常有用。它可以确保你的 URL 在各种环境中都能正确传输和解析。

### [HTML 实体编码](https://devtool.tech/entity)

HTML 实体编码工具可以帮助你将特殊字符转换为 HTML 实体，确保它们在 HTML 中正确显示。这对于防止 XSS 攻击和确保 HTML 文档的正确渲染都很重要。

### [哈希生成器](https://devtool.tech/hash)

这个工具可以生成多种常用的哈希值，包括 MD5、SHA1、SHA256 等。它在数据完整性验证、密码存储等场景中非常有用。

## 颜色工具

颜色是 Web 设计中的重要元素，以下是一些与颜色相关的工具：

### [颜色转换](https://devtool.tech/color)

这个工具可以在 RGB、HSL、CMYK 等不同颜色模型之间进行转换。它可以帮助设计师和开发者在不同的颜色表示方法之间自如切换。

![颜色转换示例](https://static.shanyue.tech/images/24-10-16/clipboard-7410.0bff76.webp)

### [调色板生成器](https://devtool.tech/palette)

这个工具可以帮助你生成颜色的色调和阴影，非常适合创建一致的颜色主题。它可以让你快速构建和谐的配色方案，提高设计效率。

![调色板生成器示例](https://devtool.tech/api/placeholder/800/300)

### [对比度计算器](https://devtool.tech/contrast-ratio)

这个工具可以计算两种颜色之间的对比度，帮助你确保文本在背景上的可读性。它对于创建符合可访问性标准的设计非常重要。

![对比度计算器示例](https://static.shanyue.tech/images/24-10-16/clipboard-2432.3b8755.webp)

## 结语

虽然有些工具可能只有我自己在用，但正是这种持续的学习和创造过程让我感到充实和快乐。

我会继续维护和改进这些工具，也欢迎大家使用并提供反馈。
