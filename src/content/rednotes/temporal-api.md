---
title: "Temporal API：JavaScript 日期时间处理的未来"
description: "深入了解 TC39 提出的 Temporal API，现代化的日期时间处理方案，支持时区、多日历系统和精确时间计算"
pubDatetime: 2025-05-31T09:15:00Z
tags: ["JavaScript", "Temporal API", "Date", "时间处理", "前端技术"]
---

# Temporal API

Temporal API 即将来临！

JavaScript 的旧 Date 对象存在诸多问题，**如缺乏时区支持、DST（夏令时）错误、日期解析不一致和可变性导致的 bug**。

Temporal API 是 TC39 提出的新解决方案，旨在取代 Date 对象，提供现代化、可靠的日期和时间处理方式。它支持**时区**、多种**日历系统**和精确的时间计算。

基本上等广大浏览器逐步支持 `Temporal API` 后，广大 npm 包如 `moment`、`date-fns` 和 `dayjs` 等的使用场景会大大降低。

---

## Temporal.ZonedDateTime：带时区的精确时间

`Temporal.ZonedDateTime` 是一个结合时间戳、时区和日历系统的对象，用于表示特定时区的精确时刻。

```js
Temporal.ZonedDateTime.from({
  timeZone: "Asia/Shanghai",
  year: 2025,
  month: 5,
  day: 30,
  hour: 8,
  minute: 0,
  second: 0,
});
```

---

## 日历系统支持

Temporal API 支持多种日历系统，如伊斯兰、希伯来、中国的日历。

地球上有三个突出的周期性事件：绕太阳自转（365.242天一圈）、月球绕地球自转（29.53天从新月到新月）和绕地轴自转（24小时从日出到日出）。每种文化都有相同的"日"度量，即24小时。

比如国内日历农历有闰月，使用 Temporal API 就可以得到很好的支持。

---

## 时间运算

Temporal API 提供强大的时间运算功能，通过 Temporal.Duration 进行加减操作。

例如，创建1小时30分钟的持续时间，添加到 PlainTime、PlainDate 或 ZonedDateTime 上，结果精确且语义清晰。

```js
const dur1 = Temporal.Duration.from({ years: 1 });
const dur2 = Temporal.Duration.from({ months: 1 });

const startingPoint = Temporal.PlainDate.from("2025-05-30");

startingPoint.add(dur1);
```
