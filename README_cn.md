# vue-tiny-virtual-list 虚拟列表 虚拟滚动列表

<p align="center">
  <a href="https://npmcharts.com/compare/vue-tiny-virtual-list?minimal=true"><img src="https://img.shields.io/npm/dm/vue-tiny-virtual-list.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-tiny-virtual-list"><img src="https://img.shields.io/npm/v/vue-tiny-virtual-list.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-tiny-virtual-list"><img src="https://img.shields.io/npm/l/vue-tiny-virtual-list.svg?sanitize=true" alt="License"></a>
</p>

<a href="./README.md" target="_blank">EN</a> | <a href="./README_cn.md" target="_blank">中文</a>

👉 <a href="https://d8diegi800.feishu.cn/wiki/MX2Vwn1RWiwUsokjhshcr6sVnNb?from=from_copylink" target="_blank">优势介绍</a>

## 文档

To check out docs, visit <a href="https://keno-lee.github.io/vue-tiny-virtual-list/" target="_blank">vue-tiny-virtual-list</a>

## 快速开始

```shell
npm install vue-tiny-virtual-list -S
```

```html
<template>
  <div style="width: 500px; height: 400px">
    <VirtualList itemKey="id" :list="list" :minSize="20">
      <template #default="{ itemData, index }">
        <div>{{ index }} - {{ itemData.id }} - {{ itemData.text }}</div>
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
