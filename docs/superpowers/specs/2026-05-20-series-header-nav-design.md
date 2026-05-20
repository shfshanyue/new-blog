# 专栏总览页与 Header 导航设计

**日期**：2026-05-20  
**状态**：已审批，待实现  
**依赖**：`2026-05-18-migrate-old-blog-series-design.md`（系列 schema、`/series/[series]`、SeriesBadge/SeriesNav 已实现）

## 背景

分支 `feat/migrate-old-blog-series` 已完成 6 个博客专栏的内容迁移与系列内导航（文章页 SeriesBadge、SeriesNav，系列详情页 `/series/[系列名]/`）。用户仍无法从全站顶栏发现专栏，需要在 **Header** 增加入口，并新增 **专栏总览页** `/series/`。

## 目标

- 在 Header 增加导航项 **「专栏」**，链接至 `/series/`
- 新建专栏总览页，自动列出全部系列，**按非 draft 文章篇数降序**排列
- 点击系列进入既有 `/series/[系列名]/` 详情页
- 不在 Footer 增加链接（YAGNI）

## 非目标

- Header 下拉直接展示各系列名
- `config.ts` 手写系列列表或排序
- 系列封面图、阅读进度、系列级 description 配置
- Footer 专栏链接

## 用户决策摘要

| 问题 | 选择 |
|------|------|
| 入口位置 | 仅 Header |
| 点击后 | 总览页 `/series/`，再进各系列 |
| 总览排序 | 自动发现，按篇数降序 |
| 导航文案 | **专栏**（非 Series / 系列） |

## 路由

| 路径 | 文件 | 说明 |
|------|------|------|
| `/series/` | `src/pages/series/index.astro`（新建） | 专栏总览 |
| `/series/{name}/` | `src/pages/series/[series].astro`（已有） | 系列文章列表 |

URL 编码与 `SeriesBadge.astro` 一致：`encodeURIComponent(seriesTitle)`。

## 数据与排序规则

### 聚合逻辑（`src/utils/getSeriesSummaries.ts`，新建）

输入：`getCollection("blog")` 的全部条目。

对每个非空的 `data.series` 字符串：

1. 累加 **公开篇数**：`draft !== true` 的文章计入 `count`
2. `slug` 即为系列标题字符串（与 frontmatter `series` 值一致，用于 `encodeURIComponent` 生成链接）

输出类型：

```typescript
export type SeriesSummary = {
  title: string; // 系列显示名，同 frontmatter series
  slug: string;  // 同 title，用于 URL
  count: number; // 非 draft 篇数
};
```

排序：

1. 主键：`count` 降序
2. 次键：`title.localeCompare("zh-CN")` 升序（篇数相同时稳定排序）

### 总览页展示（第一版）

每条系列一项，最小信息：

- 系列名（链接 → `/series/${encodeURIComponent(title)}/`）
- 副文案：`共 {count} 篇`

不展示系列简介（YAGNI）。样式参考 `series/[series].astro` 列表项或 `tags/index.astro` 的简洁列表，使用 `Main` 的 `pageTitle` / `pageDesc`。

建议 copy：

- `pageTitle`: `专栏`
- `pageDesc`: `按系列浏览技术文章，共 N 个系列。`（N 为系列个数）

## Header 改动

**文件**：`src/components/Header.astro`

1. `Props.activeNav` 联合类型增加 `"series"`
2. 在 **Posts** 之后插入：

```html
<li>
  <a href="/series/" class={activeNav === "series" ? "active" : ""}>专栏</a>
</li>
```

3. 移动端 `#menu-items` 的 `grid-rows-4` 调整为 `grid-rows-5`（或等效），避免 6 个文字链 + 搜索/主题按钮布局错位

### activeNav 传递

| 页面 | `activeNav` |
|------|-------------|
| `series/index.astro` | `"series"` |
| `series/[series].astro` | `"series"`（当前为无参 `<Header />`，需补上） |

其他页面不变。

## 页面骨架

`series/index.astro` 结构对齐 `tags/index.astro`：

```astro
<Layout title={`专栏 | ${SITE.title}`} ...>
  <Header activeNav="series" />
  <Main pageTitle="专栏" pageDesc="...">
    <ul>...</ul>
  </Main>
  <Footer />
</Layout>
```

列表渲染使用 `getSeriesSummaries(posts)` 的返回值。

## 测试与验收

1. `pnpm build` 通过，生成 `/series/index.html` 及既有系列子路径
2. 顶栏「专栏」在桌面与汉堡菜单中可点击，当前页高亮（总览页 + 任一 `/series/xxx/`）
3. 总览页系列顺序：前端工程化 > Node 牛刀小试 > …（与当前非 draft 计数一致）
4. 总览链接可进入对应系列详情页；系列详情页文章列表行为不变
5. 无 `series` 字段的普通文章不受影响

## 实现文件清单

| 操作 | 路径 |
|------|------|
| 新建 | `src/utils/getSeriesSummaries.ts` |
| 新建 | `src/pages/series/index.astro` |
| 修改 | `src/components/Header.astro` |
| 修改 | `src/pages/series/[series].astro`（`activeNav="series"`） |

## 风险与说明

- 系列名含中文/空格时依赖 `encodeURIComponent`；与现有 `SeriesBadge` 行为一致，无需 slugify
- 新增带 `series` 的文章会自动出现在总览，无需改配置
- draft 存根不计入总览 `count`，但仍出现在系列详情页（与 `[series].astro` 现有逻辑一致）
