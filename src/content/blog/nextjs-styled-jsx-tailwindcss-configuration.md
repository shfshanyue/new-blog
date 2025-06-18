---
title: "在 Next.js 中配置 styled-jsx 与 TailwindCSS 协同工作"
description: "详解如何在 Next.js 项目中配置 styled-jsx 与 TailwindCSS 协同工作，实现原子化 CSS 与复杂样式的完美结合，包含完整的配置步骤和最佳实践"
pubDatetime: 2019-11-22T09:15:00Z
tags:
  - nextjs
  - tailwindcss
  - styled-jsx
  - css
  - 原子化css
  - postcss
  - babel
  - 前端工程化
---

# 在 Next.js 中配置 styled-jsx 与 tailwindcss 协同工作

`Next.js` 中默认的 `CSS` 方案是 `styled-jsx`，而 `TailwindCSS` 是最近大火的原子化 `CSS`。如果配合 `styled-jsx` 与 `TailwindCSS` 共同使用，则只需要维护很少的 `CSS`，解决方案如下：

1. 大部分样式使用 `TailwindCSS`
2. 无法原子化的样式使用 `styled-jsx`

## 什么样的样式无法原子化？

什么样的样式无法原子化呢？有以下多种，但很庆幸的是只有一小部分：

### 1. 样式复用

避免过多的重复多个原子化的 `CSS`，DRY 原则：

```css
.item {
  @apply hover:bg-white bg-gray-100 border border-dashed cursor-pointer;
}
```

### 2. 伪类与嵌套的复杂选择器

```css
.container:hover .item {
  @apply bg-gray-100;
}
```

### 3. CSS Function

```css
.item {
  background: url(https://shanyue.tech/shanyue94.jpg);
}
```

### 4. 复杂不常用的 CSS 属性

对于一些 `TailwindCSS` 没有提供原子类的复杂 `CSS` 属性。

所以，现在重要的问题是在 `styled-jsx` 中如何配置使用 `TailwindCSS`。

## 配置步骤

### 第一步：配置 `.babelrc`

为 `styled-jsx` 添加 `PostCSS` 的插件：

```bash
npm i styled-jsx-plugin-postcss
```

```json
{
  "presets": [
    [
      "next/babel",
      {
        "styled-jsx": {
          "plugins": ["styled-jsx-plugin-postcss"]
        }
      }
    ]
  ]
}
```

### 第二步：配置 `postcss.config.js`

此时的 `TailwindCSS` 必须是个对象：

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
  },
};
```

## 总结

通过以上配置，我们就可以在 `Next.js` 项目中同时使用 `styled-jsx` 和 `TailwindCSS` 了。这种方案的优势在于：

- **原子化优先**：大部分样式使用 `TailwindCSS` 的原子类
- **灵活扩展**：复杂样式通过 `styled-jsx` 实现
- **开发体验**：保持了 `Next.js` 的默认 `CSS` 方案
- **维护性强**：减少了自定义 `CSS` 的维护成本

大功告成！
