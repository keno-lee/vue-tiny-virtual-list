<template>
  <div class="main">
    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderBegin: {{ reactiveData.renderBegin }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderEnd: {{ reactiveData.renderEnd }} </span>
    </div>

    <div class="demo-fixed">
      <VirtualList :buffer="2" :list="list" ref="virtualListRef" itemKey="id" :minSize="40" fixed>
        <template #default="{ itemData, index }">
          <Item :itemData="itemData" :index="index" />
        </template>
      </VirtualList>
    </div>
  </div>
</template>

<script lang="ts">
import { VirtualList } from 'vue-tiny-virtual-list';
import { getList } from '../utils/common';
import Item from './Item.vue';

export default {
  name: 'DemoFixed',
  components: {
    Item,
    VirtualList,
  },
  data() {
    return {
      list: [] as any[],

      reactiveData: {
        renderBegin: 0,
        renderEnd: 0,
      },
    };
  },
  mounted() {
    this.reactiveData = (this.$refs.virtualListRef as any).reactiveData;
    this.list = getList(1000);
  },
};
</script>

<style lang="scss" scoped>
.demo-fixed {
  width: 100%;
  height: 500px;
  background-color: var(--vp-sidebar-bg-color);
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
}
</style>
