---
title: Electron 41.5.0 这种小版本，反而专治桌面壳子的真气时刻
description: Electron 41.5.0 带来了 macOS 上 WebAuthn 的官方配置入口 app.configureWebAuthn，能把 Touch ID 平台认证器和多凭证选择链路补齐；同时修了 Windows 无边框窗口尺寸回跳、鼠标钩子重复安装，以及远程调试在 chrome://inspect 空白的问题。小版本，却是桌面壳子维护里会真气到拍桌子的细节。
pubDatetime: 2026-05-12T00:00:00Z
tags: ["Electron", "桌面端", "WebAuthn", "调试", "版本更新"]
---

Electron 最近发了 41.5.0，不是那种大新闻版本，但里面有几条对我这种桌面端的人挺实用。

macOS 上如果你要做 WebAuthn，平台认证器这块以前总得自己找姿势对齐。现在官方加了 app.configureWebAuthn()，可以把 Touch ID 这种平台认证器整明白；要是用户有好几个可发现凭证，还会抛 select-webauthn-account，让你自己选一个，而不是卡在半截。我手里有个内网工具刚好要走 FIDO2，这条省了我一堆排查时间。

Windows 那边也擦了两个很烦人的屁股：无边框窗口 setResizable 之后尺寸乱跳的问题修了；setIgnoreMouseEvents 里鼠标钩子偶发装重复的坑也堵上了。远程调试那条更搞：以前 chrome://inspect 打开是空白，因为 DevTools 前端 CDN 给 Electron 的 Chromium 回了 404，这次把路绕回来了。你加上 --remote-debugging-port 想用 Chrome 去挂节点时，终于不用再对着一页空白菜单发呆。

这种 patch 你不升级也能凑合跑，但踩到一次就能耗你半天；还在 41 线上的，顺手 patch 到 41.5.0 不亏。

#全栈成长之路
