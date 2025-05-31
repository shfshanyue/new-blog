---
title: "W3C Trace Context：分布式追踪的标准化方案"
description: "深入理解 W3C Trace Context 标准，学习 trace-id 和 span-id 在分布式系统中的追踪原理与实践应用"
pubDatetime: 2025-05-31T10:30:00Z
tags: ["分布式追踪", "W3C Trace Context", "OpenTelemetry", "微服务", "监控"]
---

# 分布式追踪日志

在分布式追踪（Distributed Tracing）中，**trace-id** 和 **span-id** 是 W3C Trace Context 标准和 OpenTelemetry 等追踪系统中用于标识和跟踪请求的核心概念。
它们分别表示分布式追踪的不同层级信息。

## Trace ID

- 当一个请求进入系统（如用户访问 Web 应用），追踪系统（如 OpenTelemetry）生成一个唯一的 Trace ID。
- 该 Trace ID 通过 HTTP 头（如 W3C Trace Context 的 `traceparent`）或消息元数据在所有服务间传播，确保整个调用链的追踪数据关联到同一个 Trace ID。
- 例如，一个请求可能涉及前端、API 服务和数据库，这些操作共享同一个 Trace ID。

## Span ID

- 每个服务或操作在处理请求时会创建一个 Span，并为其分配一个唯一的 Span ID。
- Span ID 通过 `traceparent` 头中的 `parent-id` 与父 Span 关联，形成树状结构。
- 例如，API 服务处理请求时生成一个 Span ID，调用数据库时生成另一个 Span ID，并将前者的 Span ID 作为后者的 `parent-id`。

## W3C Trace Context

在 W3C Trace Context 的 `traceparent` 头中，Trace ID 和 Span ID 明确定义：

```
traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01
```

- `4bf92f3577b34da6a3ce929d0e0e4736`：Trace ID，标识整个追踪。
- `00f067aa0ba902b7`：Span ID，标识当前操作。
- 如果下游服务创建新 Span，它会生成新的 Span ID，并将当前 Span ID 作为 `parent-id`。

## 示例场景

假设用户访问一个电商网站，购买商品的请求涉及以下步骤：

1. 用户点击"购买"按钮（前端服务）。
2. 前端调用订单 API（订单服务）。
3. 订单服务查询库存（库存服务）。
4. 库存服务访问数据库（数据库操作）。
