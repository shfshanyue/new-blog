---
name: create-wechat-article-from-newblog
description: Creates a WeChat graphic/text message (微信图文消息) based on the shfshanyue/new-blog Astro blog repository. Clones the repo, reads the wechat-graphic-message writing spec, studies existing article styles, drafts a new article for the given topic, saves it to src/content/wechat/, then opens a PR to main. Use when the user wants to create a new WeChat public account article (公众号图文消息) from the new-blog project.
---

# 创建微信公众号图文消息（基于 new-blog 仓库）

## 适用场景

用户给定一个主题，需要按照 shfshanyue/new-blog 仓库的规范，创作一篇微信公众号图文消息，并通过 PR 合入主分支。

---

## 工作流程

### 第一步：克隆仓库

```bash
gh repo clone shfshanyue/new-blog
cd new-blog
```

若本地已有该仓库，先拉取最新代码：

```bash
cd new-blog && git checkout main && git pull
```

### 第二步：读取写作规范

阅读以下文件，理解微信图文消息的完整写作规范：

```
.agents/skills/wechat-graphic-message/SKILL.md
```

重点关注：

- Frontmatter 字段要求（title、description、pubDatetime、tags）
- 正文格式：禁止 markdown 符号、每段后空行、末尾加 `#全栈成长之路`
- 篇幅：正文汉字约 300 字（250–400 字可接受）
- 行文风格：口语化、开篇一句话切入、具体细节、不喊口号

### 第三步：了解现有文章风格

浏览 `src/content/wechat/` 目录，至少阅读 3 篇近期文章，提炼以下要素：

- 开篇方式（直接抛问题、讲刚发生的事、转述见闻）
- 语气（聊天式、允许口语词、用「我」「你」拉近距离）
- 论证方式（具体数字、工具名、亲身经历）
- 结尾方式（一句总结或反问，不超过两句话）
- 标题风格（口语化、带情绪或悬念，非正式报告体）

参考文章示例：

- `amp-vs-cursor-first-impression.md` — 体验对比类
- `code-review-matters-more-than-coding.md` — 观点输出类
- `agents-local-collaboration.md` — 实操技巧类
- `brainstorming-skill-update-notes.md` — 工具更新类

### 第四步：创作图文消息

根据用户给定的主题，按照写作规范创作文章。

**创作要求：**

1. 开篇一句话切入，不铺垫，不写「随着……的发展」式开场
2. 语气口语化，像跟同事随口聊，允许出现口语词
3. 论证用具体数字、工具名、真实经历，不做空泛升华
4. 结构：自然段落 + 空行分隔，尽量不用编号；内容较多时才用纯数字编号（无圆点无括号）
5. 结尾一两句话，落点明确，不喊口号
6. 正文末尾独占一行添加 `#全栈成长之路`
7. 禁止使用 `**`、`` ` ``、`##`、`---` 等 markdown 符号（正文部分）
8. 不插入图片

**Frontmatter 填写：**

- `title`：给出 4–5 个候选标题，选择最口语化、最有情绪或悬念的一个
- `description`：80–120 字，含具体信息，语气与正文一致，非摘要腔
- `pubDatetime`：使用当前日期，ISO 8601 格式（如 `2026-04-17T00:00:00Z`）
- `tags`：3–5 个标签，如 `["AI", "工具", "工作流"]`

**自检清单（创作完成后逐项核对）：**

- [ ] 已包含 Frontmatter：title、description、pubDatetime、tags
- [ ] 正文未使用 `**`、`` ` ``、`##`、`---` 等 markdown 符号
- [ ] 尽量未使用数字编号，仅在内容较多需要条理化时才用
- [ ] 未插入图片
- [ ] 每一段后均空一行
- [ ] 正文汉字篇幅约在 300 字左右（250–400 字）
- [ ] 正文末尾已添加 `#全栈成长之路`
- [ ] 开篇一句话切入，无宏大铺垫
- [ ] 语气口语化，无书面套话（首先、其次、综上所述等）
- [ ] 论证用具体数字/工具名/经历，无空泛升华
- [ ] 标题口语化、带情绪或悬念，非正式报告体
- [ ] description 80–120 字，含具体信息，非摘要腔

### 第五步：保存文章

文件命名规则：英文短横线命名（kebab-case），简洁概括主题，如 `my-topic-title.md`。

保存路径：

```
src/content/wechat/<文件名>.md
```

### 第六步：创建分支并提交 PR

```bash
# 创建新分支，分支名格式：feat/wechat-<文件名（不含.md）>
git checkout -b feat/wechat-<slug>

# 添加文件
git add src/content/wechat/<文件名>.md

# 提交（遵循 Conventional Commits 规范，使用英文）
git commit -m "feat(wechat): add article about <topic in English>"

# 推送分支
git push -u origin feat/wechat-<slug>

# 创建 PR
gh pr create \
  --title "feat(wechat): add article about <topic>" \
  --body "Add a new WeChat graphic message article about <topic>.\n\nFile: src/content/wechat/<文件名>.md" \
  --base main
```

---

## 注意事项

- 提交信息使用英文，遵循 Conventional Commits 规范（`feat(wechat): ...`）
- 文件名使用英文 kebab-case，不使用中文
- 不要修改仓库中的其他文件
- PR 标题与 commit message 保持一致
- 如果用户对生成的文章有修改意见，先修改文件再重新提交，不要创建新分支
- 如果用户希望一次创建多篇文章，每篇文章单独一个分支和 PR

---

## 输出示例

文件路径：`src/content/wechat/ai-coding-tips.md`

```
---
title: 让 AI 少走弯路的三个提示词习惯
description: 用了半年 Cursor 和 Amp，总结出三个能明显减少来回拉扯的提示词习惯：给上下文、说预期结果、指定检查命令。不是什么大道理，就是每次少返工一两轮。
pubDatetime: 2026-04-17T00:00:00Z
tags: ["AI", "提示词", "Cursor", "开发效率"]
---
用 AI 写代码半年了，最大的感受是：提示词写得好不好，直接决定你要来回几轮。

不是模型不够聪明，是你没给够信息。总结了三个习惯，用下来确实少走了不少弯路。

1 给上下文，不只给任务。「帮我写一个登录接口」和「这是 Express 项目，用 JWT，帮我写一个登录接口，返回格式参考 src/utils/response.ts」，后者一次做对的概率高很多。

2 说预期结果，不说实现方式。「用 reduce 实现」不如「过滤掉 status 为 0 的项，返回 id 数组」。你告诉它目标，它自己选实现。

3 指定检查命令。「写完之后跑一下 pnpm lint && pnpm test」，这句话能省掉很多「你这里有个 bug」的来回。

三个习惯，不复杂，但每次能少返工一两轮。

#全栈成长之路
```
