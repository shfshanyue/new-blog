# 旧博客专栏迁移与系列功能实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将旧博客（`~/code/projects/old-blog`）的 6 个前端专栏迁移至新博客，并新增「系列」导航功能供读者顺序阅读。

**Architecture:** 在现有 `blog` collection schema 新增 `series` / `seriesOrder` 两个可选字段；一次性迁移脚本将旧博客文章转换为带 frontmatter 的 Astro markdown 文件并复制图片资源；新增 SeriesBadge、SeriesNav 组件和系列索引页，在 PostDetails 布局中集成它们。

**Tech Stack:** Astro 4.x, TypeScript/JavaScript (ESM), Node.js 24, Tailwind CSS

---

## 文件清单

| 文件 | 操作 | 说明 |
|---|---|---|
| `src/content.config.ts` | 修改 | 新增 series、seriesOrder 字段 |
| `scripts/migrate-old-blog.mjs` | 新增 | 一次性迁移脚本（纯 ESM JS） |
| `src/components/SeriesBadge.astro` | 新增 | 文章顶部系列标识 |
| `src/components/SeriesNav.astro` | 新增 | 文章底部系列上下篇导航 |
| `src/pages/series/[series].astro` | 新增 | 系列索引页 |
| `src/layouts/PostDetails.astro` | 修改 | 集成系列组件，处理存根显示 |

---

## Task 1: 更新 Blog Collection Schema

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: 在 blog schema 中新增两个字段**

打开 `src/content.config.ts`，在 `blog` 的 `z.object({...})` 里，`canonicalURL` 字段后添加：

```typescript
series: z.string().optional(),
seriesOrder: z.number().optional(),
```

修改后 `blog` collection 的 schema 如下（只展示变化部分）：

```typescript
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image()
        .refine(img => img.width >= 1200 && img.height >= 630, {
          message: "OpenGraph image must be at least 1200 X 630 pixels!",
        })
        .or(z.string())
        .optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      series: z.string().optional(),
      seriesOrder: z.number().optional(),
    }),
});
```

- [ ] **Step 2: 验证 schema 正常加载**

```bash
cd /Users/wangx/code/projects/new-blog
pnpm astro sync
```

期望输出：无报错，`src/env.d.ts` 正常更新。

- [ ] **Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "feat(content): add series and seriesOrder fields to blog schema"
```

---

## Task 2: 迁移脚本

**Files:**
- Create: `scripts/migrate-old-blog.mjs`

- [ ] **Step 1: 创建脚本文件**

创建 `scripts/migrate-old-blog.mjs`，内容如下：

```javascript
#!/usr/bin/env node
// 一次性迁移脚本：将 ~/code/projects/old-blog 的 6 个专栏迁移到新博客
// 运行方式：node scripts/migrate-old-blog.mjs

import fs from "fs";
import path from "path";

const OLD_BLOG = path.join(process.env.HOME, "code/projects/old-blog");
const NEW_BLOG_CONTENT = path.join(process.cwd(), "src/content/blog");
const NEW_BLOG_PUBLIC = path.join(process.cwd(), "public/assets");

// 专栏配置
// fileOrder 用于没有 meta.json 的专栏，显式指定文章顺序（文件名不含 .md）
const SERIES_CONFIGS = [
  {
    dir: "frontend-engineering",
    series: "前端工程化",
    slug: "frontend-engineering",
    tags: ["frontend-engineering"],
  },
  {
    dir: "node",
    series: "Node 牛刀小试",
    slug: "node",
    tags: ["node"],
  },
  {
    dir: "graphql-guide",
    series: "GraphQL 指南",
    slug: "graphql-guide",
    tags: ["graphql"],
    fileOrder: [
      "hello",
      "schema",
      "http",
      "resolve",
      "cache",
      "client-cache",
      "structed-error",
      "structed-log",
      "ts",
      "apq",
      "graphql-and-ssr",
    ],
  },
  {
    dir: "what-happens",
    series: "互联网协议",
    slug: "what-happens",
    tags: ["network"],
  },
  {
    dir: "web-performance",
    series: "Web 性能优化",
    slug: "web-performance",
    tags: ["performance"],
  },
  {
    dir: "flutter-guide",
    series: "Flutter 入门",
    slug: "flutter-guide",
    tags: ["flutter"],
    fileOrder: ["Readme"],
  },
];

// ── 工具函数 ──────────────────────────────────────────────

/** 递归复制目录 */
function copyDirSync(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/** 从 markdown 正文中提取第一个 H1 标题 */
function extractH1(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : null;
}

/** 去除 markdown 语法后截取前 N 个字符作为 description */
function extractDescription(content, maxLen = 100) {
  const stripped = content
    .replace(/^#{1,6}\s+.*$/gm, "")      // 去除标题
    .replace(/!\[.*?\]\(.*?\)/g, "")     // 去除图片
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // 链接保留文字
    .replace(/`{1,3}[^`]*`{1,3}/g, "")  // 去除代码
    .replace(/[*_~>#|]/g, "")           // 去除标点
    .replace(/\s+/g, " ")               // 压缩空白
    .trim();
  return stripped.slice(0, maxLen);
}

/** 修正文章中的图片路径 */
function fixImagePaths(content, seriesSlug) {
  // ./assets/xxx → /assets/series-slug/xxx
  content = content.replace(
    /!\[([^\]]*)\]\(\.\/assets\/([^)]+)\)/g,
    (_, alt, imgPath) => `![${alt}](/assets/${seriesSlug}/${imgPath})`
  );
  // /assets/images/xxx → /assets/series-slug/xxx
  content = content.replace(
    /!\[([^\]]*)\]\(\/assets\/images\/([^)]+)\)/g,
    (_, alt, imgPath) => `![${alt}](/assets/${seriesSlug}/${imgPath})`
  );
  return content;
}

/** 将旧博客的 VuePress frontmatter 从文件中去除，返回纯正文 */
function stripVuepressFrontmatter(content) {
  if (!content.startsWith("---")) return content;
  const endIndex = content.indexOf("---", 3);
  if (endIndex === -1) return content;
  return content.slice(endIndex + 3).trim();
}

/** 解析旧博客 VuePress frontmatter 中的特定字段 */
function parseVuepressFrontmatter(content) {
  if (!content.startsWith("---")) return {};
  const endIndex = content.indexOf("---", 3);
  if (endIndex === -1) return {};
  const fm = content.slice(3, endIndex);
  const result = {};
  const titleMatch = fm.match(/^title:\s*(.+)$/m);
  if (titleMatch) result.title = titleMatch[1].trim();
  const dateMatch = fm.match(/^date:\s*(.+)$/m);
  if (dateMatch) result.date = dateMatch[1].trim();
  const tagsMatch = fm.match(/^tags:\s*\n((?:\s+-\s*.+\n?)*)/m);
  if (tagsMatch) {
    result.tags = tagsMatch[1]
      .split("\n")
      .map(l => l.replace(/^\s+-\s*/, "").trim())
      .filter(Boolean);
  }
  return result;
}

/** 将日期字符串标准化为 ISO 8601（带时区） */
function normalizeDate(dateStr) {
  if (!dateStr) return "2020-01-01T00:00:00+08:00";
  // 支持 "2020-02-25 22:00" 和 "2019-04-04"
  const clean = dateStr.replace(" ", "T");
  const dt = new Date(clean.includes("T") ? clean : `${clean}T00:00:00`);
  if (isNaN(dt.getTime())) return "2020-01-01T00:00:00+08:00";
  // 保留原始时区意图（+08:00）
  return `${clean.padEnd(16, ":00")}:00+08:00`.slice(0, 19) + "+08:00";
}

/** 生成 Astro frontmatter 字符串 */
function buildFrontmatter({ title, description, pubDatetime, tags, series, seriesOrder, draft }) {
  const escapedTitle = title.replace(/"/g, '\\"');
  const escapedDesc = description.replace(/"/g, '\\"');
  const tagsStr = tags.map(t => `"${t}"`).join(", ");
  return `---
title: "${escapedTitle}"
description: "${escapedDesc}"
pubDatetime: ${pubDatetime}
tags: [${tagsStr}]
series: "${series}"
seriesOrder: ${seriesOrder}
draft: ${draft}
---

`;
}

// ── 主流程 ────────────────────────────────────────────────

let totalMigrated = 0;
let totalSkipped = 0;
let totalStubs = 0;

for (const config of SERIES_CONFIGS) {
  const seriesDir = path.join(OLD_BLOG, config.dir);
  const metaPath = path.join(seriesDir, "meta.json");
  console.log(`\n📂 处理专栏：${config.series} (${config.dir})`);

  // 构建文章列表：优先 meta.json，否则用 fileOrder
  let entries = [];
  if (fs.existsSync(metaPath)) {
    entries = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
  } else if (config.fileOrder) {
    entries = config.fileOrder.map(p => ({ path: p }));
  } else {
    console.warn(`  ⚠️  无 meta.json 且无 fileOrder，跳过`);
    continue;
  }

  // 复制图片资源
  const assetsDir = path.join(seriesDir, "assets");
  if (fs.existsSync(assetsDir)) {
    const destAssets = path.join(NEW_BLOG_PUBLIC, config.slug);
    copyDirSync(assetsDir, destAssets);
    console.log(`  📸 已复制图片资源 → public/assets/${config.slug}/`);
  }

  // 处理每篇文章
  let seriesOrder = 0;
  for (const entry of entries) {
    const filePath = path.join(seriesDir, `${entry.path}.md`);
    const destFileName = `${entry.path}.md`;
    const destPath = path.join(NEW_BLOG_CONTENT, destFileName);

    // 跳过已存在文件
    if (fs.existsSync(destPath)) {
      console.log(`  ⏭️  跳过（已存在）：${destFileName}`);
      totalSkipped++;
      continue;
    }

    seriesOrder++;

    // 读取原始内容
    let rawContent = "";
    if (fs.existsSync(filePath)) {
      rawContent = fs.readFileSync(filePath, "utf-8");
    }

    const isEmpty = rawContent.trim().length <= 100;
    const isDraft = isEmpty;

    // 解析标题
    let title = entry.title;
    if (!title) {
      // flutter-guide Readme.md 有 VuePress frontmatter
      const fmData = parseVuepressFrontmatter(rawContent);
      title = fmData.title || extractH1(rawContent) || entry.sideTitle || entry.path;
    }

    // 解析日期
    let pubDatetime = "2020-01-01T00:00:00+08:00";
    if (entry.date) {
      pubDatetime = normalizeDate(entry.date);
    } else {
      const fmData = parseVuepressFrontmatter(rawContent);
      if (fmData.date) pubDatetime = normalizeDate(fmData.date);
    }

    // 去除 VuePress frontmatter（如果有）
    let bodyContent = stripVuepressFrontmatter(rawContent);

    // 修正图片路径
    bodyContent = fixImagePaths(bodyContent, config.slug);

    // 提取 description
    const description = entry.description || (isEmpty ? "" : extractDescription(bodyContent));

    // 合并 tags
    const allTags = [...new Set([...config.tags])];

    // 生成 frontmatter
    const frontmatter = buildFrontmatter({
      title,
      description,
      pubDatetime,
      tags: allTags,
      series: config.series,
      seriesOrder,
      draft: isDraft,
    });

    // 写入新文件
    const finalContent = isDraft ? frontmatter : frontmatter + bodyContent;
    fs.writeFileSync(destPath, finalContent, "utf-8");

    if (isDraft) {
      console.log(`  📝 存根（第${seriesOrder}篇）：${title}`);
      totalStubs++;
    } else {
      console.log(`  ✅ 迁移（第${seriesOrder}篇）：${title}`);
      totalMigrated++;
    }
  }
}

console.log(`\n🎉 迁移完成！`);
console.log(`   ✅ 迁移文章：${totalMigrated} 篇`);
console.log(`   📝 存根文章：${totalStubs} 篇`);
console.log(`   ⏭️  已跳过：${totalSkipped} 篇`);
```

- [ ] **Step 2: 运行脚本并确认输出**

```bash
cd /Users/wangx/code/projects/new-blog
node scripts/migrate-old-blog.mjs
```

期望输出示例（截取）：
```
📂 处理专栏：前端工程化 (frontend-engineering)
  📸 已复制图片资源 → public/assets/frontend-engineering/
  ✅ 迁移（第1篇）：javascript 代码是如何被压缩的
  ✅ 迁移（第2篇）：如何更好地优化打包资源
  ...
  📝 存根（第12篇）：React 性能优化

🎉 迁移完成！
   ✅ 迁移文章：97 篇（左右）
   📝 存根文章：35 篇（左右）
   ⏭️  已跳过：0 篇
```

- [ ] **Step 3: 验证 Astro 能正常 build**

```bash
pnpm astro sync
```

期望：无 schema 报错。如有报错，检查生成的 `.md` 文件 frontmatter 格式（特别是特殊字符转义）。

- [ ] **Step 4: Commit**

```bash
git add scripts/migrate-old-blog.mjs src/content/blog/ public/assets/
git commit -m "feat(blog): migrate old blog series articles (frontend-engineering, node, graphql, etc.)"
```

---

## Task 3: SeriesBadge 组件

**Files:**
- Create: `src/components/SeriesBadge.astro`

- [ ] **Step 1: 创建组件**

创建 `src/components/SeriesBadge.astro`：

```astro
---
export interface Props {
  series: string;
  seriesOrder: number;
  totalInSeries: number;
}

const { series, seriesOrder, totalInSeries } = Astro.props;
const seriesUrl = `/series/${encodeURIComponent(series)}`;
---

<div class="series-badge not-prose mb-4 mt-2">
  <a
    href={seriesUrl}
    class="inline-flex items-center gap-2 rounded-md border border-skin-line bg-skin-card px-3 py-1.5 text-sm text-skin-base transition-colors hover:bg-skin-card-muted hover:text-skin-accent"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-70">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
    <span>
      <span class="font-medium">{series}</span>
      <span class="mx-1 opacity-60">·</span>
      <span class="opacity-80">第 {seriesOrder} 篇，共 {totalInSeries} 篇</span>
    </span>
  </a>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SeriesBadge.astro
git commit -m "feat(components): add SeriesBadge component"
```

---

## Task 4: SeriesNav 组件

**Files:**
- Create: `src/components/SeriesNav.astro`

- [ ] **Step 1: 创建组件**

创建 `src/components/SeriesNav.astro`：

```astro
---
export interface Props {
  prevPost?: { title: string; id: string };
  nextPost?: { title: string; id: string };
  series: string;
}

const { prevPost, nextPost, series } = Astro.props;
---

{
  (prevPost || nextPost) && (
    <nav
      class="series-nav not-prose my-8 flex flex-col gap-2 border-t border-skin-line pt-6"
      aria-label={`${series}系列导航`}
    >
      <p class="mb-2 text-xs font-medium uppercase tracking-wider opacity-50">
        系列导航
      </p>
      <div class="grid gap-3 sm:grid-cols-2">
        {prevPost ? (
          <a
            href={`/posts/${prevPost.id}`}
            class="group flex flex-col rounded-lg border border-skin-line bg-skin-card p-3 transition-colors hover:bg-skin-card-muted"
          >
            <span class="mb-1 text-xs opacity-50">← 上一篇</span>
            <span class="text-sm font-medium text-skin-accent group-hover:underline line-clamp-2">
              {prevPost.title}
            </span>
          </a>
        ) : (
          <div />
        )}
        {nextPost && (
          <a
            href={`/posts/${nextPost.id}`}
            class="group flex flex-col items-end rounded-lg border border-skin-line bg-skin-card p-3 text-right transition-colors hover:bg-skin-card-muted sm:col-start-2"
          >
            <span class="mb-1 text-xs opacity-50">下一篇 →</span>
            <span class="text-sm font-medium text-skin-accent group-hover:underline line-clamp-2">
              {nextPost.title}
            </span>
          </a>
        )}
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SeriesNav.astro
git commit -m "feat(components): add SeriesNav component"
```

---

## Task 5: 系列索引页

**Files:**
- Create: `src/pages/series/[series].astro`

- [ ] **Step 1: 创建页面**

创建 `src/pages/series/[series].astro`：

```astro
---
import { getCollection } from "astro:content";
import Layout from "@layouts/Layout.astro";
import Header from "@components/Header.astro";
import Footer from "@components/Footer.astro";
import { SITE } from "@config";

export async function getStaticPaths() {
  // 包含 draft，因为 stub 文章要显示在系列页
  const posts = await getCollection("blog");
  const seriesSet = new Set(
    posts.filter(p => p.data.series).map(p => p.data.series!)
  );
  return Array.from(seriesSet).map(series => ({
    params: { series },
  }));
}

const { series } = Astro.params as { series: string };

const allPosts = await getCollection("blog");
const seriesPosts = allPosts
  .filter(p => p.data.series === series)
  .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));

const publishedCount = seriesPosts.filter(p => !p.data.draft).length;
---

<Layout
  title={`${series} | ${SITE.title}`}
  description={`${series}系列文章，共 ${publishedCount} 篇`}
>
  <Header />
  <main id="main-content" class="mx-auto w-full max-w-3xl px-4 pb-12">
    <div class="mt-8 mb-6">
      <h1 class="text-2xl font-semibold text-skin-accent">{series}</h1>
      <p class="mt-1 text-sm opacity-70">
        共 {publishedCount} 篇文章
        {seriesPosts.length > publishedCount && `（另有 ${seriesPosts.length - publishedCount} 篇撰写中）`}
      </p>
    </div>

    <ol class="space-y-3">
      {
        seriesPosts.map((post, index) => (
          <li class="flex items-start gap-3">
            <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-skin-card text-xs font-medium text-skin-base opacity-70">
              {index + 1}
            </span>
            {post.data.draft ? (
              <div class="flex-1 rounded-lg border border-dashed border-skin-line p-3 opacity-50">
                <span class="text-sm">{post.data.title}</span>
                <span class="ml-2 rounded bg-skin-card px-1.5 py-0.5 text-xs">撰写中</span>
              </div>
            ) : (
              <a
                href={`/posts/${post.id}`}
                class="group flex-1 rounded-lg border border-skin-line bg-skin-card p-3 transition-colors hover:bg-skin-card-muted"
              >
                <p class="text-sm font-medium text-skin-accent group-hover:underline">
                  {post.data.title}
                </p>
                {post.data.description && (
                  <p class="mt-1 text-xs opacity-60 line-clamp-1">
                    {post.data.description}
                  </p>
                )}
                <p class="mt-1 text-xs opacity-40">
                  {new Date(post.data.pubDatetime).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </a>
            )}
          </li>
        ))
      }
    </ol>
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/series/
git commit -m "feat(pages): add series index page at /series/[series]"
```

---

## Task 6: 集成到 PostDetails 布局

**Files:**
- Modify: `src/layouts/PostDetails.astro`

- [ ] **Step 1: 修改 PostDetails.astro**

将 `src/layouts/PostDetails.astro` 的 frontmatter 部分（`---` 之间）替换为：

```astro
---
import Layout from "@layouts/Layout.astro";
import Header from "@components/Header.astro";
import Footer from "@components/Footer.astro";
import Tag from "@components/Tag.astro";
import Datetime from "@components/Datetime";
import SeriesBadge from "@components/SeriesBadge.astro";
import SeriesNav from "@components/SeriesNav.astro";
import { type CollectionEntry, getCollection, render } from "astro:content";
import { slugifyStr } from "@utils/slugify";
import ShareLinks from "@components/ShareLinks.astro";
import { SITE } from "@config";

export interface Props {
  post: CollectionEntry<"blog" | "rednotes">;
}

const { post } = Astro.props;

const {
  title,
  author,
  description,
  ogImage,
  canonicalURL,
  pubDatetime,
  modDatetime,
  tags,
  series,
  seriesOrder,
  draft,
} = post.data;

const { Content } = await render(post);

// 系列相关数据
let totalInSeries = 0;
let prevPost: { title: string; id: string } | undefined;
let nextPost: { title: string; id: string } | undefined;

if (series) {
  const allPosts = await getCollection("blog");
  const seriesPosts = allPosts
    .filter(p => p.data.series === series)
    .sort((a, b) => (a.data.seriesOrder ?? 0) - (b.data.seriesOrder ?? 0));

  // 仅统计已发布文章数
  totalInSeries = seriesPosts.filter(p => !p.data.draft).length;

  // 上下篇只在非草稿中查找
  const publishedInSeries = seriesPosts.filter(p => !p.data.draft);
  const currentIndex = publishedInSeries.findIndex(p => p.id === post.id);
  if (currentIndex > 0) {
    const prev = publishedInSeries[currentIndex - 1];
    prevPost = { title: prev.data.title, id: prev.id };
  }
  if (currentIndex >= 0 && currentIndex < publishedInSeries.length - 1) {
    const next = publishedInSeries[currentIndex + 1];
    nextPost = { title: next.data.title, id: next.id };
  }
}

const ogImageUrl = typeof ogImage === "string" ? ogImage : ogImage?.src;
const ogUrl = new URL(
  ogImageUrl ?? `/posts/${slugifyStr(title)}.png`,
  Astro.url.origin
).href;

const layoutProps = {
  title: `${title} | ${SITE.title}`,
  author,
  description,
  pubDatetime,
  modDatetime,
  canonicalURL,
  ogImage: ogUrl,
  scrollSmooth: true,
};
---
```

- [ ] **Step 2: 修改 HTML 模板部分**

将 `<main id="main-content">` 到 `</main>` 之间的内容替换为：

```astro
  <main id="main-content">
    <h1 transition:name={slugifyStr(title)} class="post-title">{title}</h1>
    <Datetime
      pubDatetime={pubDatetime}
      modDatetime={modDatetime}
      size="lg"
      className="my-2"
    />

    {series && seriesOrder && (
      <SeriesBadge
        series={series}
        seriesOrder={seriesOrder}
        totalInSeries={totalInSeries}
      />
    )}

    <article id="article" role="article" class="prose mx-auto mt-8 max-w-3xl">
      {draft ? (
        <div class="rounded-lg border border-dashed border-skin-line p-8 text-center">
          <p class="text-base opacity-60">📝 这篇文章还在撰写中，敬请期待。</p>
        </div>
      ) : (
        <Content />
      )}
    </article>

    {series && (prevPost || nextPost) && (
      <SeriesNav
        prevPost={prevPost}
        nextPost={nextPost}
        series={series}
      />
    )}

    <ul class="my-8">
      {tags.map(tag => <Tag tag={slugifyStr(tag)} />)}
    </ul>

    <div
      class="flex flex-col-reverse items-center justify-between gap-6 sm:flex-row-reverse sm:items-end sm:gap-4"
    >
      <button
        id="back-to-top"
        class="focus-outline whitespace-nowrap py-1 hover:opacity-75"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="rotate-90">
          <path
            d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
          ></path>
        </svg>
        <span>Back to Top</span>
      </button>

      <ShareLinks />
    </div>
  </main>
```

- [ ] **Step 3: 验证构建**

```bash
pnpm build
```

期望：构建成功，无报错。如遇 TypeScript 报错，检查 `series` / `seriesOrder` 可能为 `undefined` 的处理（已用 `&&` 条件渲染保护）。

- [ ] **Step 4: 本地预览验证**

```bash
pnpm dev
```

访问以下 URL 逐一确认：

1. 随机一篇系列文章，如 `http://localhost:4321/posts/uglify` → 应显示 SeriesBadge 和 SeriesNav
2. 系列索引页 `http://localhost:4321/series/前端工程化` → 应显示文章列表，存根标注「撰写中」
3. 存根文章不在 `http://localhost:4321/posts` 列表中出现（draft 过滤正常）
4. 无系列的普通文章（如 `http://localhost:4321/posts/cursor`）→ 不显示系列组件

- [ ] **Step 5: Commit**

```bash
git add src/layouts/PostDetails.astro
git commit -m "feat(layout): integrate SeriesBadge and SeriesNav into PostDetails"
```

---

## 完成后检查清单

- [ ] `pnpm build` 构建无报错
- [ ] 系列文章页面展示 SeriesBadge（「前端工程化系列 · 第X篇，共Y篇」）
- [ ] 系列文章页面底部展示 SeriesNav（上一篇/下一篇）
- [ ] `/series/前端工程化` 等系列索引页正常访问
- [ ] 存根文章在系列页显示「撰写中」，无法点击
- [ ] 存根文章不出现在博客文章列表中
- [ ] 普通文章（无 series 字段）不显示系列组件
- [ ] 图片资源已复制到 `public/assets/[series-slug]/`
