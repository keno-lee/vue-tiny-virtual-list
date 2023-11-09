# vue-tiny-virtual-list 虚拟列表 虚拟滚动列表

<p align="center">
  <a href="https://npmcharts.com/compare/vue-tiny-virtual-list?minimal=true"><img src="https://img.shields.io/npm/dm/vue-tiny-virtual-list.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-tiny-virtual-list"><img src="https://img.shields.io/npm/v/vue-tiny-virtual-list.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-tiny-virtual-list"><img src="https://img.shields.io/npm/l/vue-tiny-virtual-list.svg?sanitize=true" alt="License"></a>
</p>

[English README](https://github.com/keno-lee/vue-tiny-virtual-list/blob/master/README-CN.md)

👉 <a href="https://d8diegi800.feishu.cn/wiki/MX2Vwn1RWiwUsokjhshcr6sVnNb?from=from_copylink" target="_blank">优势介绍</a>

👉 <a href="https://keno-lee.github.io/vue-tiny-virtual-list/" target="_blank">在线演示地址</a>

## 优点

- 轻量 8K(gzipped 3k)
- 使用 vue-demi，支持 vue2.x 和 vue3.x
- 百万级数据 高性能、满帧率渲染
- 支持横向和纵向滚动
- typescript 支持
- 支持向上平滑滚动
- 滚动不丢失 selection
- O(1) 复杂度的滚动增量计算
- 支持多种插槽供选择、支持场景多样的扩展使用（表格、无线加载、聊天室、合并单元格等）

## 使用

```shell
npm install vue-tiny-virtual-list -S
```

```html
<template>
  <div style="width: 500px; height: 400px">
    <VirtualList itemKey="id" :list="list" :minSize="20">
      <template #default="{ itemData }">
        <div>{{ itemData.id }} - {{ itemData.text }}</div>
      </template>
    </VirtualList>
  </div>
</template>

<script>
  import { VirtualList } from 'vue-tiny-virtual-list';
  export default {
    components: { VirtualList },
    data() {
      return {
        list: [{ id: 0, text: 'text' }],
      };
    },
  };
</script>
```

### Attributes

| 参数         | 说明                                                                              | 类型             | 默认值  | 是否必须 |
| ------------ | --------------------------------------------------------------------------------- | ---------------- | ------- | -------- |
| list         | 数据                                                                              | `Array`          | -       | `否`     |
| itemKey      | 项的 id，必须唯一                                                                 | `String  Number` | -       | `是`     |
| minSize      | **最小尺寸**，会根据这个尺寸来计算可视区域内个数                                  | `Number`         | `20`    | `是`     |
| fixed        | 是否为固定高度，可以提升性能<br />**注意：动态高度模式下，请勿使用**              | `Number`         | `false` | `否`     |
| buffer       | 当渲染量大，滚动白屏严重时，可以给定数值，bufferTop 和 bufferBottom 会等于 buffer | `Number`         | `0`     | `否`     |
| bufferTop    | 顶部 buffer 个数                                                                  | `Number`         | `0`     | `否`     |
| bufferBottom | 底部 buffer 个数                                                                  | `Number`         | `0`     | `否`     |
| horizontal   | 是否水平滚动                                                                      | `Boolean`        | `false` | `否`     |

### Slot

| name          | 说明         |
| ------------- | ------------ |
| header        | 顶部插槽     |
| footer        | 底部插槽     |
| sticky-header | 顶部悬浮插槽 |
| sticky-footer | 底部悬浮插槽 |
