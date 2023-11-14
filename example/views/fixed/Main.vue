<template>
  <div class="main">
    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>RenderBegin: {{ reactiveData.renderBegin }} </span>
      <span>RenderEnd: {{ reactiveData.renderEnd }} </span>
    </div>

    <div class="demo-fixed" style="resize: auto">
      <VirtualList
        :buffer="2"
        :list="list"
        ref="virtualListRef"
        itemKey="id"
        :minSize="40"
        fixed
      >
        <template #default="{ itemData }">
          <Item :itemData="itemData" />
        </template>
      </VirtualList>
    </div>
  </div>
</template>

<script lang="ts">
import { VirtualList } from '@/src/index';
import { getList } from '@/example/utils/common';
import Item from './Item.vue';

export default {
  name: 'DemoFixed',
  components: {
    Item,
    VirtualList,
  },
  data() {
    return {
      list: getList(1000),

      reactiveData: {
        renderBegin: 0,
        renderEnd: 0,
      },
    };
  },
  mounted() {
    this.reactiveData = (this.$refs.virtualListRef as any).reactiveData;
  },
};
</script>

<style lang="scss">
.demo-fixed {
  width: 800px;
  height: 500px;
  background-color: #fff;
  overflow: hidden;
  border: 1px solid #000;

  .demo-row {
    display: flex;
  }

  .demo-cell {
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    padding: 4px;
  }
}
</style>
