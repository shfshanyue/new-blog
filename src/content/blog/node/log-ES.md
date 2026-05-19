---
title: "日志的收集"
description: "+ filebeat"
pubDatetime: 2020-01-01T00:00:00+08:00
tags: ["node"]
series: "Node 牛刀小试"
seriesOrder: 33
draft: false
---

# 日志的收集

- filebeat

## IOPS

## 日志所影响的CPU及内存

## `class` / `extends`

```js
function Animal(name) {
  this.name = name;
}

Animal.prototype.hello = () => {
  console.log("hello");
};

function Dog(name, say) {
  Animal.call(this, name);
  this.say = say;
}

Dog.prototype = Object.create(Animal.prototype);

Reflect.defineProperty(Dog.prototype, "constructor", {
  value: Dog,
  enumerable: false, // 不可枚举
  writable: true,
});
```

```js
class Animal {
  constructor(name) {
    this.name = name;
  }

  hello() {
    console.log("hello");
  }
}

class Dog extends Animal {
  constructor(name, say) {
    super(name);
    this.say = say;
  }
}
```
