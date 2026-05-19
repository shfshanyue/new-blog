---
title: "源码分析"
description: "1. 验证 Schema 的有效性 1. 解析 Source(Operation) 1. 执行 + validateSchema + validateRootTypes + validateDirectives + validateTypes + parseSource + Source + Document + execute + ro"
pubDatetime: 2020-01-01T00:00:00+08:00
tags: ["graphql"]
series: "GraphQL 指南"
seriesOrder: 2
draft: false
---

# 源码分析

## 源码

1. 验证 Schema 的有效性
1. 解析 Source(Operation)
1. 执行

- validateSchema
  - validateRootTypes
  - validateDirectives
  - validateTypes
- parseSource
  - Source
  - Document
- execute
  - rootType -> 可以从此获取到诸多 fields

## 执行 execute

- execute
  - buildExecutionContext: 构建执行上下文信息，如 defaultResolver、operation 等
  - rootFields: 通过 获取到根路径的所有字段
  - executeOperation

## Query

```js
executeFields(exeContext, rootType, rootValue, path, rootFields);
```

- executeFields
  - executeField
    - source, args, contextValue, info
    - resolvFn
    - completeValue

## Mutation

```js
executeFieldsSerially(exeContext, rootType, rootValue, path, rootFields);
```

- executeFieldsSerially

## Schema

- GraphQLSchema
- GraphQLObjectType
- GraphQLDirective

- isObjectType

- schema.getQueryType()
- schema.getMutationType()
- schema.getSubscriptionType()
- schema.getDirectives()
