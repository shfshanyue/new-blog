---
title: React 关键字高亮组件实现：十行代码搞定文本高亮功能
description: 详解如何使用仅十行React代码实现一个高性能的关键字高亮组件，包含正则表达式处理、mark标签语义化、以及完整的实现方案和最佳实践。
pubDatetime: 2019-03-19T00:14:44.000Z
tags: ["react", "javascript", "frontend", "component", "text-highlight"]
---

最近遇到了一个小问题：

**一串长文本，一个关键词数组，对长文本中的关键词进行高亮。**

最后实现效果如下： <https://shici.xiange.tech/poems/l0c0leh93v8>

<!--more-->

## 使用 js 实现高亮函数

取巧一点方法，可以对长文本中的关键字进行替换，使之包装在一个标签下，为标签添加高亮样式。

为了更好地语义化，对关键词高亮应该使用什么 html 标签呢？

使用 `mark` 标签！

> 关于 mark 标签更多内容参考: https://www.w3schools.com/TAgs/tag_mark.asp

```javascript
function highlight(string, words) {
  if (!words.length) {
    return string;
  }
  const reg = new RegExp(words.join("|"), "g");
  return string.replace(reg, '<mark class="highlight">$&</mark>');
}

// <mark class="highlight">松风<mark>吹解带，<mark class="highlight">山月<mark>照弹琴。
highlight("松风吹解带，山月照弹琴。", ["山月", "松风"]);
```

## 在 React 中实现高亮函数

```javascript
function Highlight({ string, words }) {
  const reg = new RegExp(words.join("|"), "g");
  const token = string.replace(reg, "#@$&#");
  const elements = token.split("#").map(x =>
    x[0] === "@"
      ? React.createElement(
          "mark",
          {
            classname: "highlight",
          },
          x.slice(1)
        )
      : x
  );
  return React.createElement("div", null, ...elements);
}
```
