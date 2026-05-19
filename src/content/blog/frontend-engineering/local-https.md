---
title: "如何为前端本地环境配置 https 证书"
description: "使用某些 html API 时，https 是前置必须项，这要求我们在本地开发环境也能够配置 https。否则你要每次部署到测试环境才能预览效果，这对开发的敏捷度造成了极大的干扰。"
pubDatetime: 2020-07-09T20:42:00+08:00
tags: ["frontend-engineering"]
series: "前端工程化"
seriesOrder: 9
draft: false
---

# 在本地环境为前端项目配置 https

前端在使用某些 html5 API 时，`https` 是前置必须项，某些 API 只能在 `https` 保障安全的情况下才能开启，比如录音功能的 `AudioContext API`。

这要求我们在本地开发环境也能够配置 `https`，否则你需要每次部署到配有 https 的测试环境中才能预览效果，这对开发的敏捷度造成了极大的干扰。

如果能够在本地环境(`localhost`)生成证书，这将为开发体验提供极大的便利及舒适度，而这也是十分必要的。

## 关于证书

关于 `https` 的介绍与原理，有很多篇文章对此有极其详尽的介绍，然而在实践过程中最后都要落地为以下两个文件

1. `cert-file`
1. `key-file`

**以及 `CA`，给证书提供安全性保障的机构，当然也可自制。**

对于个人及小微企业的证书，使用 `Let's Encrypt` 制作，只需一个 `ACME` 简单配置即可搞定。

但对于本地环境下的 `https` 如此操作就显得大费周章、无必要且无可能: 你不可能给 `localhost` 配置 https 证书。

另外一种方式是使用 `openssl` 自签名证书，自建 Root CA。不过这对于不熟悉 `https` 及一些命令行的人而言，`openssl` 那晦涩难懂的命令行简直是无字天书级别的操作。

凡是复杂且常见的需求，必有人开发出更简单的工具解放生产力，也必有成熟的解决方案占领市场。

而用以简化本地证书制作的工具就是 [mkcert](https://github.com/FiloSottile/mkcert)，一个使用 Go 语言编写，在 Github 上有 32K Star 的项目。

## 使用 mkcert

[mkcert](https://github.com/FiloSottile/mkcert) 是一个用 GO 写的零配置专门用来本地环境 https 证书生成的工具。

```bash
# 安装 mkcert
$ brew install mkcert

# 为本地环境安装 CA
$ mkcert -install
Created a new local CA at "/Users/shanyue/Library/Application Support/mkcert" 💥
The local CA is now installed in the system trust store! ⚡️
The local CA is now installed in the Firefox trust store (requires browser restart)! 🦊

$ mkcert local.shanyue.tech
Using the local CA at "/Users/xiange/Library/Application Support/mkcert" ✨

Created a new certificate valid for the following names 📜
 - "local.shanyue.tech"

The certificate is at "./local.shanyue.tech.pem" and the key at "./local.shanyue.tech-key.pem" ✅
```

通过 cert 最终会成功安装 CA，并生成 `cert` 及 `key` 两个文件，文件目录如下。这一步很重要，接下来的步骤将会利用到这两个生成的文件。

```js
{
  key: './local.shanyue.tech-key.pem',
  cert: './local.shanyue.tech.pem'
}
```

最后，记得在 `/etc/hosts` 中添加域名IP映射

```bash
127.0.0.1 local.shanyue.tech
```

## 在 webpack 中配置 https

如果你使用了 `webpack`，那恭喜你，配置 `https` 只需要在 `devServer` 处添加两行代码。

将上一步 `mkcert` 生成的两个文件作为 `webpack.devServer.key` 与 `webpack.devServer.cert` 的配置选项。

```js
module.exports = {
  //...
  devServer: {
    https: true,
    key: fs.readFileSync("./local.shanyue.tech-key.pem"),
    cert: fs.readFileSync("./local.shanyue.tech.pem"),
  },
};
```

启动本地开发环境，切换到 `https` 链接即可正常访问。

## 在 node server 中配置 https

如果你的前端项目是通过 `express` 读取静态文件启动，那这就比 webpack 稍微有点麻烦。

此时在Node 服务中开启 https，以 `express` 为例，需要使用到 `https` 模块，如下所示

```js
import path from "path";
import fs from "fs";
import express from "express";
import http from "http";
import https from "https";

const app = express();

const cred = {
  key: fs.readFileSync(path.resolve(__dirname, "../key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname, "../cert.pem")),
};
const httpServer = http.createServer(app);
const httpsServer = https.createServer(cred, app);

httpServer.listen(8000);
httpsServer.listen(8888);
```

而对于 `webpack-dev-server`，仔细阅读源码就能过发现它的原理也是如此，详见代码 [webpack-dev-server:/lib/Server.js](https://github.com/webpack/webpack-dev-server/blob/master/lib/Server.js#L677)

```js
const http = require("http");
const https = require("https");

if (this.options.https) {
  if (semver.gte(process.version, "10.0.0") || !isHttp2) {
    this.listeningApp = https.createServer(this.options.https, this.app);
  } else {
    // The relevant issues are:
    // https://github.com/spdy-http2/node-spdy/issues/350
    // https://github.com/webpack/webpack-dev-server/issues/1592
    this.listeningApp = require("spdy").createServer(
      this.options.https,
      this.app
    );
  }
} else {
  this.listeningApp = http.createServer(this.app);
}
```

## 总结

本篇文章讲解了以下几个点

1. 在本地环境可以通过 `mkcert` 制作证书
1. webpack 中如何配置证书及其原理
1. Node 原生 http server 如何配置证书
