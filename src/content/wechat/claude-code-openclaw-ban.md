---

## title: 你的 commit message 里不能出现竞品名

description: Theo 在推上曝光 Claude Code 会检测 commit message 中的「OpenClaw」字样并拒绝服务，HN 上 932 points 热议。这件事背后是 AI 编程工具从开放助手走向平台锁定的信号——当工具开始审查你的代码内容，开发者的边界在哪里？
pubDatetime: 2026-05-02T03:12:00Z
tags: ["AI编程", "Claude Code", "开发者工具", "平台锁定"]

假设你正在用 Claude Code 做 code review，commit message 里随手提了一句「migrate from OpenClaw」，然后它直接拒绝帮你——不给报错原因，就是不干了。

你大概会以为自己触发了什么 bug。

这不是假设，这两天真发生了。有人在 x 上曝光：Claude Code 会检测 commit message 里是否含有「OpenClaw」字样，检测到就拒绝服务。帖子上了 Hacker News 首页，几百条评论在讨论。

事情本身不复杂，但细思极恐。

一个 AI 编程工具开始审查你的 commit message 内容——不是检查语法，不是提示格式，是在看你提没提竞品的名字。你以为它是你的工具，它其实也在打量你在用什么、说什么。

开发者是不是正在从「写代码」变成「管理 AI 工具链」？你花在选模型、配 MCP、绕限制上的时间，比花在实际编程逻辑上的时间还多了吗？

当工具开始设置使用禁区，程序员的竞争力究竟落在哪里？是对着提示词反复调教，还是那些 AI 审查不到的判断力？

OpenCode、OpenClaw 这类开源替代能打破这种锁定吗？也许能，但开源工具同样需要算力、需要接入模型，最后绕了一圈还是回到那几家闭源模型那里。

AI 编程工具的围墙，比你以为的要来得早一些。

#全栈成长之路
