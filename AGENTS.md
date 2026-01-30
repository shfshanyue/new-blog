# AGENTS.md

本文件为 AI Agent 提供项目级别的上下文与规范。

## 项目概述

这是一个基于 Astro 构建的个人技术博客项目，使用 AstroPaper 主题。主要用于发布技术文章、学习笔记和个人思考。

## 技术栈

- **框架**: Astro 4.x + TypeScript
- **样式**: Tailwind CSS + @tailwindcss/typography
- **内容**: Markdown (type-safe)
- **组件**: React (部分交互组件)
- **构建优化**: Jampack
- **代码质量**: ESLint + Prettier + Husky + lint-staged
- **提交规范**: Commitizen + Conventional Commits

## 项目结构

```
/
├── src/
│   ├── content/          # 内容集合
│   │   ├── blog/         # 主要技术博客文章
│   │   ├── rednotes/     # 小红书风格的短文章
│   │   ├── wechat/       # 微信图文素材
│   │   └── config.ts     # 内容集合配置
│   ├── layouts/          # 页面布局
│   ├── components/       # React/Astro 组件
│   └── pages/            # 路由页面
├── public/               # 静态资源
└── .cursor/
    ├── skills/           # AI Agent 技能
    └── rules/            # Cursor 规则（已迁移至本文件）
```

## 内容类型

### 1. Blog (`src/content/blog/`)

主要的技术文章，内容较长、深度较高。涵盖前端、后端、数据库、工具等技术主题。

**写作规范**：
- 语言风格参考现有文章，如 `tailwindcss.md`
- 在英文单词前后添加空格
- 专业名词使用 `` ` `` 包裹，如 `OpenTelemetry`
- 使用 Frontmatter 指定 `title`、`description`、`pubDatetime`、`tags` 等元数据
- 可包含代码示例、图片、表格等丰富内容

### 2. Rednotes (`src/content/rednotes/`)

小红书风格的技术短文，内容精炼、结构清晰。

**写作规范**：
- 参考 `.cursor/skills/xiaohongshu-article-writing-guide/SKILL.md`
- 一级标题控制在 200 字左右
- 二级标题每节 150-250 字，使用 `---` 分隔
- 突出关键词使用 `**粗体**`
- 生成 2-4 个二级标题

### 3. WeChat (`src/content/wechat/`)

微信公众号图文素材。

**写作规范**：
- 参考 `.cursor/skills/wechat-graphic-message/SKILL.md`
- 不使用 markdown 符号（`**`、`` ` ``、`##`、`---`）
- 可使用 1 2 3 数字编号
- 不插入图片
- 每一段后空一行
- 生成标题时给出 4-5 个选项
- 避免 AI 风套话，保持口语化、人性化表达

## Git 提交规范

- 使用英文生成 git commit message
- 遵循 Conventional Commits 规范
- 类型：`feat`、`fix`、`docs`、`style`、`refactor`、`test`、`chore` 等
- 格式：`<type>(<scope>): <subject>`

示例：
```
feat(blog): add new article about Temporal API
fix(rednotes): correct image path in state-of-css article
docs(readme): update installation instructions
```

## 开发命令

```bash
pnpm dev        # 启动开发服务器
pnpm build      # 构建生产版本
pnpm preview    # 预览构建结果
pnpm format     # 格式化代码
pnpm lint       # 代码检查
pnpm cz         # 交互式提交（Commitizen）
```

## 内容创建工作流

1. **选择内容类型**：根据文章长度和用途选择内容集合
   - `blog/` - 深度技术文章
   - `rednotes/` - 小红书风格短文
   - `wechat/` - 微信图文素材
2. **创建 Markdown 文件**：在 `src/content/{collection}/` 目录创建 `.md` 文件，文件名使用 kebab-case
3. **添加 Frontmatter**：填写必要的元数据（title、description、pubDatetime、tags）
4. **编写正文**：遵循对应的写作规范
5. **本地预览**：使用 `pnpm dev` 查看效果
6. **提交代码**：使用 `pnpm cz` 或手动编写符合规范的 commit message

## 相关技能（Skills）

项目中定义了以下 AI Agent 技能，在相关场景下会自动应用：

- **xiaohongshu-article-writing-guide**: 小红书风格技术文章写作规范
- **wechat-graphic-message**: 微信图文消息写作与润色规范

## 注意事项

- 所有 markdown 文件需经过 Prettier 格式化
- 提交前会自动运行 lint-staged 检查
- 图片等静态资源放在 `public/` 目录下
- 避免在文章中使用绝对路径，使用相对路径或 `/` 开头的根路径
