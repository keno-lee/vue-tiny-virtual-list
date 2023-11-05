# vue-tiny-virtual-list 虚拟列表 虚拟滚动列表

<p align="center">
  <a href="https://npmcharts.com/compare/vue-tiny-virtual-list?minimal=true"><img src="https://img.shields.io/npm/dm/vue-tiny-virtual-list.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-tiny-virtual-list"><img src="https://img.shields.io/npm/v/vue-tiny-virtual-list.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-tiny-virtual-list"><img src="https://img.shields.io/npm/l/vue-tiny-virtual-list.svg?sanitize=true" alt="License"></a>
</p>

[中文文档](https://github.com/keno-lee/vue-tiny-virtual-list/blob/master/README-CN.md)

👉 <a href="https://d8diegi800.feishu.cn/wiki/MX2Vwn1RWiwUsokjhshcr6sVnNb?from=from_copylink" target="_blank">Advantages</a>

👉 <a href="https://keno-lee.github.io/vue-tiny-virtual-list/" target="_blank">Live demo</a>

## 优点

- Tiny: 8K (gzipped 3k)
- Works for both Vue 3 and 2 (Use vue-demi)
- Millions of data, high performance, full frame rate rendering
- Supports horizontal and vertical scrolling
- Typescript support
- Supports smooth scrolling upwards
- Scroll without losing selection
- O(1) complexity rolling increment calculation
- Supports a variety of slots to choose from, and supports expansion in various scenarios (tables, wireless loading, chat rooms, merged cells, etc.)

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

| Name         | Description                                                                                                                                                  | Type             | Default | Required |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ------- | -------- |
| list         | data list                                                                                                                                                    | `Array`          | -       | `false`  |
| itemKey      | list item id                                                                                                                                                 | `String  Number` | -       | `true`   |
| minSize      | Minimum size, the number in the visible area will be calculated based on this size                                                                           | `Number`         | -       | `true`   |
| fixed        | Fixed height mode can improve performance                                                                                                                    | `Number`         | -       | `false`  |
| buffer       | When the amount of rendering is large and the scrolling white screen is serious, you can give values, and bufferTop and bufferBottom will be equal to buffer | `Number`         | `0`     | `false`  |
| bufferTop    | 顶部 buffer 个数                                                                                                                                             | `Number`         | `0`     | `false`  |
| bufferBottom | buffer for footer                                                                                                                                            | `Number`         | `0`     | `false`  |
| horizontal   | is horizontal                                                                                                                                                | `Boolean`        | `false` | `false`  |

### slot

| name          | Description        |
| ------------- | ------------------ |
| header        | header slot        |
| footer        | footer slot        |
| sticky-header | sticky header slot |
| sticky-footer | sticky footer slot |
