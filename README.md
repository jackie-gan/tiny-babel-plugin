# @jg/babel-plugin-tiny-optional-chaining
一个小型babel插件，模拟`optional-chaining`

## 用法

目前仅适用于`if`语句，在需要可选链的值后添加`$$`

- 转换前
```js
const a = { b: { c: '123' } };
if (a.b$$.c) {
  // 其他操作
}
```

- 转换后

```js
const a = { b: { c: '123' } };
if (a.b && a.b.c) {
  // 其他操作
}
```
