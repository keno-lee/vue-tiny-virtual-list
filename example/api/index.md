# API 文档

## Table 属性

| 参数         | 说明                                                                              | 类型             | 默认值  | 是否必须 |
| ------------ | --------------------------------------------------------------------------------- | ---------------- | ------- | -------- |
| list         | 数据                                                                              | `Array`          | -       | -        |
| itemKey      | 项的 id，必须唯一                                                                 | `String  Number` | -       | `是`     |
| minSize      | **最小尺寸**，会根据这个尺寸来计算可视区域内个数                                  | `Number`         | `20`    | `是`     |
| fixed        | 是否为固定高度，可以提升性能<br />**注意：动态高度模式下，请勿使用**              | `Number`         | `false` | -        |
| buffer       | 当渲染量大，滚动白屏严重时，可以给定数值，bufferTop 和 bufferBottom 会等于 buffer | `Number`         | `0`     | -        |
| bufferTop    | 顶部 buffer 个数                                                                  | `Number`         | `0`     | -        |
| bufferBottom | 底部 buffer 个数                                                                  | `Number`         | `0`     | -        |
| horizontal   | 是否水平滚动                                                                      | `Boolean`        | `false` | -        |

## 插槽

| name          | 说明                                           |
| ------------- | ---------------------------------------------- |
| header        | 顶部插槽                                       |
| footer        | 底部插槽                                       |
| sticky-header | 顶部悬浮插槽                                   |
| sticky-footer | 底部悬浮插槽                                   |
| default       | item 内容， `作用域参数为 { itemData, index }` |

## 事件

| 方法名   | 说明       | 参数           |
| -------- | ---------- | -------------- |
| toTop    | 触顶的回调 | 列表中第一项   |
| toBottom | 触底的回调 | 列表中最后一项 |

## 暴露方法

| 方法名         | 说明             | 参数 |
| -------------- | ---------------- | ---- |
| scrollToTop    | scroll to top    | -    |
| scrollToBottom | scroll to bottom | -    |
