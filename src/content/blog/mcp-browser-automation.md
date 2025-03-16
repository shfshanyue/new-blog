---
title: MCP简介：从浏览器截图的自动化说起
pubDatetime: 2025-03-16T10:00:00+08:00
description: "本文介绍 Model Context Protocol (MCP) 这一开放协议如何标准化 AI 工具与外部系统的交互，并通过浏览器自动化示例展示 MCP 如何使 AI 助手能够直接进行网页截图、内容抓取和自动化测试等操作，大幅提升开发效率。"
---

# MCP简介：从浏览器截图的自动化说起

在当今 AI 飞速发展的时代，大型语言模型 (LLM) 如 `Claude`、`ChatGPT` 等已经在代码生成、内容创作等方面展现出惊人的能力。然而，这些强大的模型存在一个明显的局限性——它们通常与外部系统和工具隔离，无法直接访问或操作用户环境中的资源和工具。

而 `Model Context Protocol` (MCP) 的出现，正是为了解决这一问题。

## 什么是MCP？

`Model Context Protocol` (MCP) 是由 `Anthropic` 公司推出的一个开放协议，它标准化了应用程序如何向大型语言模型 (LLM) 提供上下文和工具的方式。我们可以将 MCP 理解为 AI 应用的"USB-C 接口"——就像 USB-C 为各种设备提供了标准化的连接方式，MCP 为 AI 模型提供了与不同数据源和工具连接的标准化方式。

简单来说，MCP可以做到以下事情：

- 读取和写入本地文件
- 查询数据库
- 执行命令行操作
- 控制浏览器
- 与第三方 API 交互

这极大地扩展了 AI 助手的能力边界，使其不再仅限于对话框内的文本交互。

## MCP的架构

![MCP架构简图](https://static.shanyue.tech/images/25-03-16/clipboard-4563.218765.webp)

> 以上图片来源于 [MCP 官方文档](https://modelcontextprotocol.io/introduction)

MCP 的架构相对简单，主要包含两个核心组件：

1. **MCP 服务器 (Server)**：提供工具和资源的服务端，可以使用任何编程语言实现，只要能够通过 `stdout`/`stdin` 或 HTTP 通信。
2. **MCP 客户端 (Client)**：使用 MCP 服务器提供的工具和资源的 AI 应用，如 `Claude Desktop`、`Cursor` 编辑器等。

MCP 服务器向客户端提供两种主要能力：

- **工具 (Tools)**：可执行的函数，允许 AI 执行特定操作
- **资源 (Resources)**：提供给 AI 的上下文信息，如文件内容、数据库结构等

## 浏览器自动化：MCP的实际应用

为了更直观地理解 MCP 的强大之处，让我们看一个案例：**使用 `Playwright MCP` 服务器进行浏览器自动化**。

[`Playwright`](https://playwright.dev/) 是一个由 `Microsoft` 开发的浏览器自动化工具，可以控制 `Chrome`、`Firefox`、`Safari` 等主流浏览器。通过 `Playwright MCP` 服务器，我们可以让 AI 助手直接操作浏览器，执行各种任务。

### 先讲讲使用场景

1. 博客写作。当我写博客时，我需要打开浏览器，打开目标网站，然后截图，并保存到本地特定的目录中，并在 `markdown` 中引用图片地址。
2. 端到端测试。当我需要测试网站时，我需要打开浏览器，打开目标网站，然后进行一些操作，比如填写表单、点击按钮等。就算有 `Playwright` 的测试框架，但仍需要人工介入，比如自定义 `data-cy`，浏览器操作一遍保存 playwright 的测试代码并扔给 cursor 生成测试。

### 场景一：博客写作的图片自动化

作为技术博主，我经常需要在文章中引用网站截图来说明问题或展示效果。在传统流程中，这个过程相当繁琐：

1. 打开浏览器访问目标网站
2. 使用截图工具截取所需区域
3. 保存截图到特定目录
4. 处理图片（可能需要裁剪、压缩等）
5. 在 `Markdown` 文件中手动添加图片链接
6. 确认图片正确显示

这个过程不仅耗时，而且容易出错。使用 `Playwright MCP`，整个流程可以简化为：

```
请访问 https://tailwindcss.com，截取首页顶部导航栏区域，保存到 @public/images/ 下，并生成 markdown 图片引用代码
```

Cursor 通过 MCP 协议会：

- 自动打开网站
- 精确定位并截取导航栏元素
- 保存到指定目录
- 自动生成符合博客格式的图片引用代码

这不仅节省了时间，还保证了图片引用的一致性和准确性。对于需要多张截图的长篇技术文章，效率提升尤为显著。

更进阶的应用还包括：

- 自动为截图添加高亮或注释
- 对比同一网站在不同设备上的显示效果
- 跟踪网站的 UI 变化并自动更新文章中的截图

### 场景二：端到端测试的自动化

端到端测试是前端开发中的重要环节，但传统方式存在诸多痛点：

1. **繁琐的测试编写**：即使使用 `Cypress` 等工具，编写测试脚本仍需要手动规划测试路径、定位元素、设计断言等
2. **元素选择器维护**：需要在代码中添加特定属性（如 `data-cy`）用于测试，且这些选择器需要随着 UI 变化而维护
3. **测试代码与产品代码分离**：测试逻辑往往与开发逻辑分离，导致测试更新滞后于功能更新
4. **复杂交互流程难以模拟**：多步骤的用户操作（如表单填写、多页面导航）需要精确编排

即便使用 Chrome 的 `DevTools` 的 `Recorder` 功能，也只能生成 `Playwright` 的测试代码，并且需要人工介入，比如自定义 `data-cy`，浏览器操作一遍保存 playwright 的测试代码并扔给 cursor 生成测试。

或者通过 cursor 与 recorder 提效后的环节：

1. 让 cursor 在关键位置插入 `data-cy` 属性
2. 使用 `Chrome DevTools` 的 `Recorder` 功能生成测试代码
3. 将测试代码扔给 cursor 生成测试

而通过 `Playwright MCP`，开发者可以自然语言描述测试场景，让 Cursor 直接生成并执行测试：

```
用户：测试我的登录流程：访问 http://localhost:3000/login，使用测试账号 test@example.com 和密码 Test123!，验证登录成功后页面应跳转到仪表盘并显示欢迎信息
```

Cursor 会：

- 在必要位置插入 `data-cy` 属性
- 自动访问登录页面
- 填写表单并提交
- 验证跳转和欢迎信息
- 报告测试结果
- 生成可复用的 `Playwright` 测试代码

这种方式不仅降低了编写测试的门槛，还能根据测试结果智能调整测试策略。例如，如果登录按钮位置变化，Cursor 可以通过视觉识别重新定位元素，而不是简单地报告选择器失效。

对于快速迭代的项目尤其有价值：

- 在代码修改后立即验证功能完整性
- 快速生成回归测试套件
- 模拟复杂的用户行为路径
- 根据用户反馈自动创建针对性测试

这两个场景说明，MCP 不仅仅是连接 AI 与工具的技术桥梁，更是能够实质性改变开发者工作流程的革新力量。通过消除重复性工作，开发者可以将更多精力集中在创意和解决问题上。

### 示例：使用executeautomation/mcp-playwright

[`executeautomation/mcp-playwright`](https://github.com/executeautomation/mcp-playwright) 是一个基于 `Playwright` 的 MCP 服务器实现，它提供了一系列工具，使得 AI 助手能够：

- 打开网页
- 截取网页或元素截图
- 填写表单
- 点击按钮
- 提取网页内容
- 执行 `JavaScript` 代码
- 等待网页加载或元素出现

下面以一个简单的场景为例：**让 AI 助手打开一个网站并截图**。

传统方式下，这个任务可能需要你：

1. 安装 `Playwright`
2. 编写自动化脚本
3. 配置环境
4. 运行脚本
5. 处理截图结果

而使用 MCP，整个过程可以简化为与 AI 助手的对话：

> 用户：请打开 Google 首页并截图  
> AI 助手：好的，我将为您打开 Google 首页并截图。  
> [AI 助手通过 MCP 控制浏览器，打开 google.com 并截图]  
> AI 助手：已成功截图，这是 Google 首页的截图。[显示截图]

整个过程中，用户不需要编写任何代码，AI 助手通过 MCP 服务器直接控制浏览器完成任务。

### Playwright MCP 服务器的安装与配置

如果你想尝试使用 `Playwright MCP` 服务器，可以按照以下步骤进行设置：

1. 使用 `npm` 安装 `Playwright MCP` 服务器：

   ```bash
   npm install -g @executeautomation/playwright-mcp-server
   ```

2. 配置 `Claude Desktop` 客户端（以 MacOS 为例）：
   编辑配置文件 `~/Library/Application\ Support/Claude/claude_desktop_config.json`，添加以下内容：

   ```json
   {
     "mcpServers": {
       "playwright": {
         "command": "npx",
         "args": ["-y", "@executeautomation/playwright-mcp-server"]
       }
     }
   }
   ```

3. 重启 `Claude` 客户端，你会看到一个新的 "Attach MCP" 按钮。

4. 点击该按钮，选择 `Playwright MCP` 服务器，现在你的 AI 助手就可以控制浏览器了！

## 在 Cursor 中使用 Playwright MCP

`Cursor` 是一款集成了 AI 能力的代码编辑器，它也支持 MCP 协议。我们可以在 `Cursor` 中配置 `Playwright MCP` 服务器，使 AI 助手能够在开发过程中直接操作浏览器。

### 配置步骤

1. 首先确保已安装 `Playwright MCP` 服务器：

   ```bash
   npm install -g @executeautomation/playwright-mcp-server
   ```

2. 在 `Cursor` 中配置 MCP 服务器，有两种方式：

   **方式一：通过配置文件**（推荐）

   编辑 `~/.cursor/mcp.json` 文件（如果不存在则创建），添加以下内容：

   ```json
   {
     "mcpServers": {
       "playwright": {
         "command": "npx",
         "args": ["-y", "@executeautomation/playwright-mcp-server"]
       }
     }
   }
   ```

   **方式二：通过项目配置**

   在项目根目录下创建 `.cursor/mcp.json` 文件，内容同上。这样配置的 MCP 服务器只在当前项目中可用。

3. 重启 `Cursor` 编辑器，使配置生效。

### 使用场景示例

在 `Cursor` 中使用 `Playwright MCP` 可以大大提升前端开发和测试效率。以下是一些常见的使用场景：

1. **快速页面测试**：

   在开发 Web 页面时，可以让 AI 助手直接打开页面，检查渲染效果，无需手动切换到浏览器。

   > 用户：请打开我当前开发的页面 http://localhost:3000，检查响应式布局在移动设备上的显示效果
   >
   > Cursor：[通过 Playwright MCP 打开页面并进行移动设备模拟，然后截图展示结果]

2. **自动化截图对比**：

   在进行 UI 改动时，可以让 AI 助手截取改动前后的页面对比图。

   > 用户：我刚修改了导航栏的样式，请打开 http://localhost:3000，截图并与 production 环境 https://myapp.com 的页面进行对比
   >
   > Cursor：[使用 Playwright MCP 分别截取两个环境的页面，并进行对比分析]

3. **交互测试**：

   让 AI 助手模拟用户交互，验证功能是否正常工作。

   > 用户：请测试我的登录表单，打开 http://localhost:3000/login，使用测试账号填写表单并提交，检查是否成功登录
   >
   > Cursor：[使用 Playwright MCP 打开页面，填写表单并提交，验证登录流程]

4. **开发过程中的实时调试**：

   在编码过程中，可以让 AI 助手实时检查页面变化。

   > 用户：我刚刚修改了 Button 组件的样式，请打开组件预览页面检查不同状态下的按钮外观
   >
   > Cursor：[打开页面，截取不同状态的按钮截图，并分析样式是否符合预期]

通过这些场景，我们可以看到，`Playwright MCP` 在 `Cursor` 中的应用不仅简化了前端开发工作流，还提供了更直观的开发体验，让 AI 助手成为开发过程中的得力助手。

## MCP 的优势与局限性

### 优势

1. **扩展 AI 能力**：让 AI 助手能够与外部系统交互，大大扩展其应用场景
2. **标准化接口**：提供统一的协议，降低 AI 工具集成的复杂度
3. **安全可控**：用户可以审核 AI 助手的操作请求，确保安全
4. **灵活扩展**：可以根据需要开发自定义 MCP 服务器

### 局限性

1. **新兴技术**：MCP 仍处于发展早期，协议可能会变化
2. **远程开发限制**：MCP 服务器需要在本地机器上运行，远程开发环境可能存在问题
3. **资源支持**：部分 MCP 客户端如 `Cursor` 尚未支持 `resources`/`prompts` 功能

Cursor 的 MCP 支持限制：

![Cursor MCP 资源支持](https://static.shanyue.tech/images/25-03-16/clipboard-8608.79b6a5.webp)

## 未来展望

MCP 作为一种连接 AI 与外部系统的标准化协议，有着广阔的应用前景：

1. **智能化开发工作流**：AI 助手可以更深入地参与到开发流程中，自动化执行测试、部署等任务
2. **数据分析与可视化**：AI 助手可以直接访问数据库，生成分析报告和可视化结果
3. **跨平台自动化**：统一的协议使 AI 助手能够操作不同平台和工具
4. **个性化智能助手**：用户可以配置自己的 MCP 服务器，创建专属于自己工作流的 AI 助手

## 结语

`Model Context Protocol` (MCP) 正在打破 AI 助手与外部世界之间的壁垒，使 AI 能够更加深入地融入我们的工作流程。从浏览器自动化到代码编辑器集成，MCP 展示了 AI 与传统工具结合的强大潜力。

以前可以说，`Cursor` 虽然代码敲的好，但它不能直接操作浏览器，不能直接操作数据库，不能直接操作文件系统，开发这个流程还是需要我频繁接手的。

现在来说，需要我们接手的次数会越来越少。

最后再推荐两个 MCP 相关的资源：

1. [`MCP.so` - MCP Server 目录](https://mcp.so/)
2. [`Awesome MCP Servers` - GitHub 仓库](https://github.com/punkpeye/awesome-mcp-servers)

## 参考资料

1. [`Model Context Protocol` 官方文档](https://modelcontextprotocol.io/introduction)
2. [`executeautomation/mcp-playwright` GitHub 仓库](https://github.com/executeautomation/mcp-playwright)
3. [`Cursor MCP` 文档](https://docs.cursor.com/context/model-context-protocol)
