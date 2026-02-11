---
title: TypeScript Brand Type：在结构化类型中实现名义类型
pubDatetime: 2025-02-11T12:00:00+08:00
description: "介绍 TypeScript 中的 Brand Type 模式，用唯一标记属性在结构化类型系统中实现名义类型效果，防止货币、ID 等相同结构类型的误用。"
tags:
  - TypeScript
  - 类型系统
---

今日阅读 tldraw 源码时，其中有关于 `Brand Type` 的应用，用于区分不同类型 ID，避免混用，因此分享一下 Brand Type 的实现与应用。

**Brand Type（标记类型）** 是 TypeScript 中一种高级模式，用于在结构化类型系统中创建**名义类型**的效果。

## 问题背景

TypeScript 使用**结构化类型系统**（Structural Typing），只要结构相同，类型就兼容：

```typescript
type USD = number;
type EUR = number;

const dollars: USD = 100;
const euros: EUR = dollars; // ✅ 可以赋值！但这在业务上可能是错误的
```

## Brand Type 解决方案

通过添加一个**唯一的标记属性**来区分类型：

```typescript
type Brand<T, BrandName> = T & { __brand: BrandName };

type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

const dollars = 100 as USD;
const euros = 50 as EUR;

const total: USD = euros; // ❌ 类型错误！
```

## 实际应用场景

### 1. 货币类型

```typescript
type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;

function convertToEUR(amount: USD): EUR {
  return (amount * 0.85) as EUR;
}
```

### 2. ID 类型

```typescript
type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;

function getUser(id: UserId) {
  /* ... */
}
function getProduct(id: ProductId) {
  /* ... */
}

const userId = "user_123" as UserId;
const productId = "prod_456" as ProductId;

getUser(productId); // ❌ 类型错误！防止混用
```

### 3. 验证过的数据

```typescript
type ValidatedEmail = Brand<string, "ValidatedEmail">;

function validateEmail(email: string): ValidatedEmail | null {
  if (/@/.test(email)) {
    return email as ValidatedEmail;
  }
  return null;
}

function sendEmail(to: ValidatedEmail) {
  // 保证传入的是验证过的邮箱
}

sendEmail("test@example.com"); // ❌ 必须先验证
const validated = validateEmail("test@example.com");
if (validated) {
  sendEmail(validated); // ✅
}
```

## 优点

- **类型安全**：防止不同语义的相同结构类型混用
- **自文档化**：类型名称清晰表达业务含义
- **编译时检查**：在开发阶段就能发现错误

## 常见实现

```typescript
// 简单版本
type Brand<T, BrandName> = T & { __brand: BrandName };

// Symbol 版本（更安全）
declare const brand: unique symbol;
type Brand<T, BrandName> = T & { [brand]: BrandName };
```
