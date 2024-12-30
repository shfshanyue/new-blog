- 有两个独立组件，一个为 100px 的 Square，一个为 200px 的 Circle。点击按钮时，使 Square 可以顺滑地变成 Circle 组件。
- 有两个独立组件，一个为 50px 高的 ComponentA，一个为 100px 高的 ComponentB。ComponentA 在 ComponentB 上方，点击按钮时，使 ComponentA fideOut，并使 ComponentB 往上顺滑移动。

```tsx
<div className="space-y-4">
  <ComponentA />
  <ComponentB />
</div>
```

- Tab 页有三个 Tab，点击不同的 Tab 时，使每个 TabHeader 下的下划线可以平移到对应的 Tab 上。
