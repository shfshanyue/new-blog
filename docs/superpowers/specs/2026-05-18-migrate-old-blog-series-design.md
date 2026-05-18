# 旧博客专栏迁移与系列功能设计

**日期**：2026-05-18  
**状态**：已审批，待实现

## 背景

旧博客（`~/code/projects/old-blog`，VuePress）包含大量有价值的技术专栏文章，这些内容在新博客（Astro）中无法访问。本设计将旧博客的前端相关专栏迁移至新博客，并新增「系列」功能以还原专栏的阅读体验。

## 迁移范围

以下 6 个专栏，合计约 97 篇有内容文章 + 约 35 篇空文件（存根）：

| 旧目录 | 系列名称 | 有内容篇数 |
|---|---|---|
| `frontend-engineering/` | 前端工程化 | 45 篇 |
| `node/` | Node 牛刀小试 | 31 篇 |
| `graphql-guide/` | GraphQL 指南 | 10 篇 |
| `what-happens/` | 互联网协议 | 7 篇 |
| `web-performance/` | Web 性能优化 | 3 篇 |
| `flutter-guide/` | Flutter 入门 | 1 篇 |

## 数据结构

### Schema 变更（`src/content.config.ts`）

在 `blog` collection schema 中新增两个可选字段：

```typescript
series: z.string().optional(),        // 系列名称，如 "前端工程化"
seriesOrder: z.number().optional(),   // 在系列中的排序序号（从 1 开始）
```

`draft` 字段（已存在）用于区分存根文章：`draft: true` 的文章不出现在公开列表，但 URL 可访问。

### Frontmatter 示例

**有内容的文章：**

```yaml
---
title: "javascript 代码是如何被压缩的"
description: "在前端中但凡谈到打包，肯定要提及到 webpack..."
pubDatetime: 2020-02-25T22:00:00+08:00
tags: ["webpack", "frontend-engineering"]
series: "前端工程化"
seriesOrder: 1
draft: false
---
```

**空文件存根：**

```yaml
---
title: "React 性能优化"
description: ""
pubDatetime: 2020-01-01T00:00:00+08:00
tags: ["frontend-engineering"]
series: "前端工程化"
seriesOrder: 18
draft: true
---
```

## 迁移脚本

**文件**：`scripts/migrate-old-blog.ts`  
**运行方式**：`npx tsx scripts/migrate-old-blog.ts`（一次性执行）

### 处理流程

```
对每个专栏目录：
  1. 读取 meta.json → title、date、description、排列顺序
  2. 读取 .md 文件正文
  3. 判断文章类型：
     - 正文 > 100 字节 → 正常文章（draft: false）
     - 正文 ≤ 100 字节 → 存根文章（draft: true，正文留空）
  4. 修正图片路径：
     - ./assets/xxx.png → /assets/[series-slug]/xxx.png
     - /assets/images/xxx.png → /assets/[series-slug]/xxx.png
  5. 生成 frontmatter，写入 src/content/blog/[filename].md
  6. 复制图片到 public/assets/[series-slug]/
```

### 特殊情况处理

- **无 description**：截取正文前 100 个字（去除 markdown 语法）作为 description
- **无 date**：使用 `2020-01-01T00:00:00+08:00` 作为默认值
- **文件名冲突**：若 `src/content/blog/` 中已存在同名文件，跳过并输出警告
- **Readme.md**：跳过不处理

### 系列 slug 映射

| series | series-slug（用于资源路径） |
|---|---|
| 前端工程化 | frontend-engineering |
| Node 牛刀小试 | node |
| GraphQL 指南 | graphql-guide |
| 互联网协议 | what-happens |
| Web 性能优化 | web-performance |
| Flutter 入门 | flutter-guide |

## UI 组件

### 1. `src/components/SeriesBadge.astro`

位置：文章标题下方（`PostDetails.astro` 中）

显示：
```
📚 前端工程化系列 · 第 3 篇，共 11 篇
```

- 点击跳转 `/series/前端工程化`
- 仅当文章有 `series` 字段时渲染

**Props：**
```typescript
interface Props {
  series: string;
  seriesOrder: number;
  totalInSeries: number;
}
```

### 2. `src/components/SeriesNav.astro`

位置：文章正文末尾、评论区上方（`PostDetails.astro` 中）

显示：
```
← 上一篇：网站的缓存控制策略最佳实践
→ 下一篇：团队编码规范约束最佳实践
```

- 按 `seriesOrder` 排序确定上下篇
- 仅当文章有 `series` 字段时渲染

**Props：**
```typescript
interface Props {
  prevPost?: { title: string; id: string };
  nextPost?: { title: string; id: string };
}
```

### 3. `src/pages/series/[series].astro`

URL：`/series/前端工程化`（中文 URL，Astro 自动处理编码）

内容：
- 系列标题与描述
- 按 `seriesOrder` 排序的文章列表
- 已发布文章显示标题 + 摘要 + 日期（可点击）
- 存根文章（draft: true）显示标题 + 「撰写中」标注（不可点击）

数据获取：
```typescript
const allPosts = await getCollection("blog");
// 包含 draft: true 的文章（存根需要显示在系列页）
const seriesPosts = allPosts
  .filter(p => p.data.series === series)
  .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));
```

### 4. 存根文章渲染（`src/layouts/PostDetails.astro` 修改）

当文章正文为空且 `draft: true` 时，正文区域显示：

```
📝 这篇文章还在撰写中，敬请期待。
```

## 改动文件清单

| 文件 | 类型 | 说明 |
|---|---|---|
| `src/content.config.ts` | 修改 | 新增 series、seriesOrder 字段 |
| `src/components/SeriesBadge.astro` | 新增 | 系列标识组件 |
| `src/components/SeriesNav.astro` | 新增 | 系列内上下篇导航 |
| `src/pages/series/[series].astro` | 新增 | 系列索引页 |
| `src/layouts/PostDetails.astro` | 修改 | 集成 SeriesBadge、SeriesNav，处理存根渲染 |
| `scripts/migrate-old-blog.ts` | 新增 | 一次性迁移脚本 |

## 不在范围内

- 旧博客其他专栏（op/、k8s/、go/ 等）— 可后续单独迁移
- 评论系统迁移
- 旧博客 URL 重定向（`/frontend-engineering/uglify` → `/posts/uglify`）
- 系列页面加入全局导航菜单
