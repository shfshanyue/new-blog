---
title: "sentry"
description: ""
pubDatetime: 2020-01-01T00:00:00+08:00
tags: ["node"]
series: "Node 牛刀小试"
seriesOrder: 43
draft: false
---

```bash
$ npm install @sentry/node
```

```js
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://f1dd118c70e04dc2bfbcd7296ae11f05@o274112.ingest.sentry.io/5278778",
});
```
