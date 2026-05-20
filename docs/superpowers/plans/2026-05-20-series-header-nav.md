# 专栏总览页与 Header 导航实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 Header 增加「专栏」入口，并新增 `/series/` 总览页，按非 draft 篇数降序列出全部系列。

**Architecture:** 新建 `getSeriesSummaries` 从 `blog` collection 聚合 `series` 字段并排序；`series/index.astro` 复用 Tags 页布局模式；`Header.astro` 增加导航项与 `activeNav="series"`；系列详情页补上同一 `activeNav`。本仓库无单元测试框架，用 `pnpm build` 与产物路径验收。

**Tech Stack:** Astro 4.x, TypeScript, astro:content, Tailwind CSS

**Spec:** `docs/superpowers/specs/2026-05-20-series-header-nav-design.md`

---

## 文件清单

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/utils/getSeriesSummaries.ts` | 新建 | 聚合系列名与公开篇数、排序 |
| `src/pages/series/index.astro` | 新建 | 专栏总览页 `/series/` |
| `src/components/Header.astro` | 修改 | 「专栏」链接、`activeNav`、移动端 grid |
| `src/pages/series/[series].astro` | 修改 | `activeNav="series"` |

---

## Task 1: `getSeriesSummaries` 工具函数

**Files:**
- Create: `src/utils/getSeriesSummaries.ts`

- [ ] **Step 1: 创建工具文件**

```typescript
import type { CollectionEntry } from "astro:content";

export type SeriesSummary = {
  title: string;
  slug: string;
  count: number;
};

export default function getSeriesSummaries(
  posts: CollectionEntry<"blog">[]
): SeriesSummary[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    const title = post.data.series?.trim();
    if (!title) continue;
    if (post.data.draft === true) continue;

    counts.set(title, (counts.get(title) ?? 0) + 1);
  }

  const summaries: SeriesSummary[] = [...counts.entries()].map(
    ([title, count]) => ({
      title,
      slug: title,
      count,
    })
  );

  summaries.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.title.localeCompare(b.title, "zh-CN");
  });

  return summaries;
}
```

注意：此处**不使用** `postFilter`（不过滤未到发布时间的 scheduled 文），与 spec「`draft !== true` 即计入」一致。

- [ ] **Step 2: 类型检查（通过 build 间接验证）**

Run: `pnpm build 2>&1 | tail -20`

Expected: 若仅新增 util、尚未引用，build 仍应成功（无新错误）。

- [ ] **Step 3: Commit**

```bash
git add src/utils/getSeriesSummaries.ts
git commit -m "feat(utils): add getSeriesSummaries for series index page"
```

---

## Task 2: 专栏总览页 `series/index.astro`

**Files:**
- Create: `src/pages/series/index.astro`

- [ ] **Step 1: 创建页面文件**

```astro
---
import { getCollection } from "astro:content";
import Header from "@components/Header.astro";
import Footer from "@components/Footer.astro";
import Layout from "@layouts/Layout.astro";
import Main from "@layouts/Main.astro";
import getSeriesSummaries from "@utils/getSeriesSummaries";
import { SITE } from "@config";

const posts = await getCollection("blog");
const seriesList = getSeriesSummaries(posts);
const seriesCount = seriesList.length;
---

<Layout title={`专栏 | ${SITE.title}`} author={SITE.author} pubDatetime="">
  <Header activeNav="series" />
  <Main
    pageTitle="专栏"
    pageDesc={`按系列浏览技术文章，共 ${seriesCount} 个系列。`}
  >
    <ul class="space-y-4">
      {
        seriesList.map(({ title, slug, count }) => (
          <li class="rounded-md border border-skin-line px-4 py-3">
            <a
              href={`/series/${encodeURIComponent(slug)}/`}
              class="font-medium decoration-dashed underline underline-offset-[5px] hover:no-underline"
            >
              {title}
            </a>
            <p class="mt-1 text-sm opacity-80">共 {count} 篇</p>
          </li>
        ))
      }
    </ul>
  </Main>
  <Footer />
</Layout>
```

- [ ] **Step 2: 构建并确认产物**

Run: `pnpm build`

Expected: exit 0；且存在 `dist/series/index.html`（或项目配置的 output 目录下等价路径）。

Run: `ls dist/series/`

Expected: 包含 `index.html` 以及既有各系列子目录（如 `前端工程化/index.html` 等，URL 编码形式视 Astro 输出而定）。

- [ ] **Step 3: 确认排序（可选快速检查）**

Run:

```bash
rg -o 'href="/series/[^"]+' dist/series/index.html | head -10
```

Expected: 第一个系列链接对应「前端工程化」（当前非 draft 篇数最多），其次为「Node 牛刀小试」。

- [ ] **Step 4: Commit**

```bash
git add src/pages/series/index.astro
git commit -m "feat(pages): add series overview page at /series/"
```

---

## Task 3: Header 增加「专栏」导航

**Files:**
- Modify: `src/components/Header.astro`

- [ ] **Step 1: 扩展 `activeNav` 类型**

将第 7 行：

```typescript
activeNav?: "posts" | "tags" | "about" | "search" | "rednotes" | "wechat";
```

改为：

```typescript
activeNav?:
  | "posts"
  | "series"
  | "tags"
  | "about"
  | "search"
  | "rednotes"
  | "wechat";
```

- [ ] **Step 2: 在 Posts 后插入专栏链接**

在 Posts 的 `</li>` 之后、RedNotes 的 `<li>` 之前插入：

```astro
          <li>
            <a href="/series/" class={activeNav === "series" ? "active" : ""}>
              专栏
            </a>
          </li>
```

- [ ] **Step 3: 调整移动端 grid 行数**

将 `nav ul` 的 class 中的 `grid-rows-4` 改为 `grid-rows-5`（约第 156 行）：

```css
    @apply mt-4 grid w-44 grid-cols-2 grid-rows-5 gap-x-2 gap-y-2 sm:ml-0 sm:mt-0 sm:w-auto sm:gap-x-5 sm:gap-y-0;
```

- [ ] **Step 4: 构建验证**

Run: `pnpm build`

Expected: exit 0。

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat(header): add 专栏 nav link to series overview"
```

---

## Task 4: 系列详情页高亮「专栏」

**Files:**
- Modify: `src/pages/series/[series].astro`

- [ ] **Step 1: 为 Header 传入 activeNav**

将：

```astro
  <Header />
```

改为：

```astro
  <Header activeNav="series" />
```

- [ ] **Step 2: 构建验证**

Run: `pnpm build`

Expected: exit 0。

- [ ] **Step 3: Commit**

```bash
git add src/pages/series/[series].astro
git commit -m "feat(pages): highlight 专栏 nav on series detail pages"
```

---

## Task 5: 端到端验收

- [ ] **Step 1: 完整构建**

Run: `pnpm build`

Expected: 无 error。

- [ ] **Step 2: 本地预览抽查（可选）**

Run: `pnpm dev`

在浏览器检查：

1. 顶栏 Posts 右侧出现「专栏」
2. `/series/` 列出 6 个系列，篇数降序
3. 点击「前端工程化」进入系列列表，顶栏「专栏」仍为 active 下划线
4. 普通无 series 文章页顶栏「专栏」不高亮

- [ ] **Step 3: 更新 spec 状态（可选）**

将 `docs/superpowers/specs/2026-05-20-series-header-nav-design.md` 首段 **状态** 改为 `已实现`。

若修改 spec，单独 commit：

```bash
git add docs/superpowers/specs/2026-05-20-series-header-nav-design.md
git commit -m "docs(spec): mark series header nav design as implemented"
```

---

## Spec 覆盖自检

| Spec 要求 | 对应 Task |
|-----------|-----------|
| Header「专栏」→ `/series/` | Task 3 |
| 总览页按非 draft 篇数降序 | Task 1 + Task 2 |
| 链接 `encodeURIComponent` | Task 2 |
| `activeNav` 总览 + 详情 | Task 2 + Task 4 |
| 移动端 grid 调整 | Task 3 |
| 不含 Footer / 下拉 / config 静态列表 | 无任务（YAGNI） |
| `pnpm build` 验收 | Task 5 |

---

## 预期系列顺序（实现后核对）

基于当前内容（`draft !== true` 计数，实现后 build 时以实际为准）：

1. 前端工程化
2. Node 牛刀小试
3. GraphQL 指南
4. 互联网协议
5. Web 性能优化
6. Flutter 入门
