<template>
  <div class="main">
    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderBegin: {{ reactiveData.renderBegin }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderEnd: {{ reactiveData.renderEnd }} </span>
    </div>

    <div class="demo-table">
      <VirtualList ref="virtualListRef" :list="list" :minSize="40" itemKey="id">
        <template #default="{ itemData, index }">
          <Item :itemData="itemData" :index="index" />
        </template>
        <template #stickyHeader>
          <div class="header">
            <div
              class="header-cell"
              style="
                width: 200px;
                position: sticky;
                left: 0;
                background-color: cyan;
                overflow: hidden;
              "
            >
              id
            </div>
            <div class="header-cell" style="width: 600px">Column1</div>
            <div class="header-cell" style="width: 600px">Column2</div>
            <div
              class="header-cell"
              style="width: 100px; position: sticky; right: 0; background-color: cyan"
            >
              操作
            </div>
          </div>
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
  name: 'DemoTable',
  components: {
    VirtualList,
    Item,
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
.demo-table {
  width: 100%;
  height: 500px;
  background-color: var(--vp-sidebar-bg-color);
  overflow: hidden;
  border: 1px solid var(--vp-c-border);

  .header {
    height: 40px;
    line-height: 40px;
    display: flex;
    position: sticky;
    top: 0;
    z-index: 1;
    text-align: center;
    background: #fff;
    width: min-content;
    background-color: cyan;

    .header-cell {
      border-right: 1px solid var(--vp-c-border);
      border-bottom: 1px solid var(--vp-c-border);
      background-color: cyan;

      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
