---
title: Node 26.1 终于能 dlopen 了，但我不会急着上生产
description: Node.js 26.1 带来实验性 node:ffi，可以从 node:ffi 里 dlopen 动态库，按参数和返回值签名直接调原生函数，启动要加 --experimental-ffi。我照着文档试了挂系统库算 sqrt，能跑；但 ABI、内存和 segfault 风险都在，适合调用面很小的边角需求，主链路还是先做好安全补丁和依赖升级。
pubDatetime: 2026-05-30T00:00:00Z
tags: ["Node.js", "FFI", "原生扩展", "后端", "工程实践"]
---

Node 26.1 把实验性的 node:ffi 抬上来了，我第一反应不是爽，是想起以前为了调一个 C 库写 N-API 绑定的日子。

以前想在 Node 里碰一下原生动态库，要么自己写 addon，要么绕 child_process 调 CLI，要么上 wasm，门槛都不低。现在可以直接从 node:ffi 里 dlopen，把参数类型和返回值写清楚就能调，启动要加 --experimental-ffi，权限模型开严了还得 --allow-ffi。

我照着文档试了下最土的例子，挂系统库算个 sqrt，能跑。真业务里我会更谨慎：ABI 对不齐、内存谁释放、原生段 segfault 会不会把整个 Node 进程带走，这些老问题一个没少。它更适合调用面很小、性能敏感、又不想长期维护一整份绑定的边角需求，比如某个图像处理或加解密库里就两三个导出函数。

如果你团队连 Next 和 React 那波安全补丁都还没升完，别急着把 FFI 塞进主链路。先把常规升级和依赖审计做好，这块当备选雷达盯着就行。

#全栈成长之路
