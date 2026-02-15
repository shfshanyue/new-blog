---
title: 用 Design System 和 Design Tokens 管住 UI，比「高级感」重要
description: 用 uiuxpro 做了几轮 UI 重构后的体会：生成效果够不够高级看人，但真正学到的是建 Design System、维护 Design Tokens、用语义化 token 和 variant 替代随手写的 gray-xxx 和乱 class，外加对比度和图标建议很实用。
pubDatetime: 2025-02-12T00:00:00Z
tags: ["Design System", "Design Tokens", "UI", "shadcn", "前端"]
---

最近用 uiuxpro 这个 skill 给几个项目做了 UI 重构。我生成出来的界面不算「高级」，我觉得是否高级跟使用者关系更大，但对我自己来说已经完全够用了。

但在这个 skill 里学到最重要的一点不是「高级」 的 UI，而是：建立一套 Design System，把 Design Tokens 统一管起来。

以前用 shadcn，其实也有一套 design tokens，只是很少刻意去用。文字颜色基本就 text-gray-700，要淡一点就 text-gray-400、text-gray-500，搞到最后 text-gray-100 到 text-gray-900 全齐了。但现在会用 text-foreground、text-muted 这种有语义的 token，从而避免颜色的硬编码。

Button 也是。以前 classname 写一大堆，现在用 variant 来区分：primary、secondary、outline 之类。以前倒是也会用 variant，但现在基本上尽量只用 variant，避免手写 Button 的 classname。这样至少可以避免五颜六色的丑。

另外对比度提示、图标的建议，用下来也挺顺手，能少踩不少坑。

#全栈成长之路
