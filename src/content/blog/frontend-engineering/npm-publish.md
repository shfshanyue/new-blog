---
title: "如何对 npm package 进行发包"
description: "在发布公共 package 之前，需要在 $1进行注册一个账号。 随后，在本地(需要发包的地方)执行命令 npm login ，进行交互式操作并且登录。 发布一个 npm 包之前，填写 package.json 中以下三项最重要的字段。假设此时包的名称为 @shanyue/just-demo 之后执行 npm publish 发包即可。"
pubDatetime: 2020-01-01T00:00:00+08:00
tags: ["frontend-engineering"]
series: "前端工程化"
seriesOrder: 41
draft: false
---

# 如何对 npm package 进行发包

## 准备工作：一个账号

在发布公共 package 之前，需要在 [npm 官网](https://www.npmjs.com/)进行注册一个账号。

随后，在本地(需要发包的地方)执行命令 `npm login`，进行交互式操作并且登录。

```bash
$ npm login
```

## 发包

发布一个 npm 包之前，填写 `package.json` 中以下三项最重要的字段。假设此时包的名称为 `@shanyue/just-demo`

```js
{
  name: '@shanyue/just-demo',
  version: '1.0.0',
  main: './index.js',
}
```

之后执行 `npm publish` 发包即可。

```bash
$ npm publish
```

一旦发布完成，在任意地方通过 `npm i` 均可依赖该包。

```js
const x = require("@shanyue/just-demo");

console.log(x);
```

如若该包进行更新后，需要再次发包，可 `npm version` 控制该版本进行升级，记住需要遵守 [Semver 规范](https://github.com/shfshanyue/Daily-Question/issues/534)

```bash
# 增加一个修复版本号: 1.0.1 -> 1.0.2 (自动更改 package.json 中的 version 字段)
$ npm version patch

# 增加一个小的版本号: 1.0.1 -> 1.1.0 (自动更改 package.json 中的 version 字段)
$ npm version minor

# 将更新后的包发布到 npm 中
$ npm publish
```

## 实际发包的内容

在 npm 发包时，实际发包内容为 `package.json` 中 `files` 字段，一般只需将构建后资源(如果需要构建)进行发包，源文件可发可不发。

```js
{
  files: ["dist"];
}
```

若需要查看一个 package 的发包内容，可直接在 `node_modules/${package}` 进行查看，将会发现它和源码有很大不同。也可以在 CDN 中进行查看，以 React 为例

1. jsdelivr: <https://cdn.jsdelivr.net/npm/react/>
1. unpkg: <https://unpkg.com/browse/react/>

![UNPKG](https://cdn.jsdelivr.net/gh/shfshanyue/assets/2021-11-27/clipboard-7248.4f8241.webp)

## 发包的实际流程

`npm publish` 将自动走过以下生命周期

- prepublishOnly: 如果发包之前需要构建，可以放在这里执行
- prepack
- prepare: 如果发包之前需要构建，可以放在这里执行 (该周期也会在 npm i 后自动执行)
- postpack
- publish
- postpublish

发包实际上是将本地 package 中的所有资源进行打包，并上传到 npm 的一个过程。你可以通过 `npm pack` 命令查看详情

```bash
$ npm pack

npm notice
npm notice 📦  midash@0.2.6
npm notice === Tarball Contents ===
npm notice 1.1kB  LICENSE
npm notice 812B   README.md
npm notice 5.7kB  dist/midash.cjs.development.js
npm notice 13.4kB dist/midash.cjs.development.js.map
npm notice 3.2kB  dist/midash.cjs.production.min.js
npm notice 10.5kB dist/midash.cjs.production.min.js.map
npm notice 5.3kB  dist/midash.esm.js
npm notice 13.4kB dist/midash.esm.js.map
npm notice 176B   dist/omit.d.ts
......
npm notice === Tarball Details ===
npm notice name:          midash
npm notice version:       0.2.6
npm notice filename:      midash-0.2.6.tgz
npm notice package size:  11.5 kB
npm notice unpacked size: 67.8 kB
npm notice shasum:        c89d8c1aa96f78ce8b1dcf8f0f058fa7a6936a6a
npm notice integrity:     sha512-lyx8khPVkCHvH[...]kBL6K6VqOG6dQ==
npm notice total files:   46
npm notice
midash-0.2.6.tgz
```

当你发包成功后，也可以前往 [npm devtool](https://npm.devtool.tech/react) 查看各项数据。

![](https://cdn.jsdelivr.net/gh/shfshanyue/assets/2021-11-27/clipboard-8735.9e7628.webp)
