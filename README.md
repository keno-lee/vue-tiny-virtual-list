# 虚拟列表 vue-tiny-virtual-list

## 优点

- 高性能，支持百万级数据（上限取决于浏览器 body 渲染高度限制）
- 满帧率渲染
- 支持横向和纵向滚动
- 支持多种插槽供选择、支持场景多样的扩展使用（表格、无线加载、聊天室、合并单元格等）
- 使用 vue-demi，支持 vue2.x 和 vue3.x
- typescript 支持
- 支持向上平滑滚动（修复了抖动问题）

## [在线演示地址](https://keno-lee.github.io/vue-tiny-virtual-list/)

## [wiki docs](https://wholesale-tiglon-742.notion.site/vue-tiny-virtual-list-a6f35a24029b445da4d1a20e8dc881cf)

## 使用

```html
<template>
  <div style="width: 500px; height: 400px">
    <VirtualList itemKey="id" :list="list" :minSize="40">
      <template #default="{ itemData }">
        <Item :itemData="itemData" />
      </template>
    </VirtualList>
  </div>
</template>

<script>
  import { VirtualList } from 'hoyo-virtual-list';
  import Item from './Item';

  export default {
    components: { VirtualList },
    data() {
      return {
        list: [],
      };
    },
  };
</script>
```
