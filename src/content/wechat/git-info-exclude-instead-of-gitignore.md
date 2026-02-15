---
title: 公司不让改 .gitignore 时，用 .git/info/exclude 照样能「忽略」文件
description: 公司限制用外部 AI、不让改 .gitignore 或 code review 不允许动它时，可以把要忽略的路径写在 .git/info/exclude 里，效果等同忽略，且不碰项目里的 .gitignore。
pubDatetime: 2025-02-13T00:00:00Z
tags: ["Git", "工作流", "Code Review", "AI 工具"]
---

有的公司不允许用外部 AI，或者只让用内部的做的贼烂的 AI Coding。也有的公司允许用 AI，但不许你在项目中设置 AI 的配置文件。

不管是哪种情况，你本地想用 AGENTS.md，但你既不想提交上去，又不想往 .gitignore 里加。

有个办法：别动项目根目录的 .gitignore，去改你项目的 .git/info/exclude 文件。

这个文件语法和 .gitignore 一样，一行一个规则。你把自己想忽略的路径写进去，比如 AGENTS.md、.cursor 目录，Git 在你这台机器上就会忽略它们，提交时不会带上去。别的同事 clone 下来不会有这个 exclude 文件里的内容，所以也不会影响团队。

1 不用改 .gitignore，不触发 code review 对「修改 .gitignore 列表」的审查。

2 忽略规则只在你本地生效，不会进仓库，别人不受影响。

3 以后换电脑或新 clone，记得在新仓库里再配一遍 exclude 就行。

适合那种「公司管得严、但你自己想用一套本地配置」的场景。用下来挺省心。

#全栈成长之路
