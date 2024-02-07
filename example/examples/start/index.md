# 开始使用

## 安装

::: code-group

```sh [npm]
  $ npm add vue-tiny-virtual-list
```

```sh [pnpm]
  $ pnpm add vue-tiny-virtual-list
```

```sh [yarn]
  $ yarn add vue-tiny-virtual-list
```

:::

## 依赖

- `"vue": "^2.0.0 || >=3.0.0"`

## 引入

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
