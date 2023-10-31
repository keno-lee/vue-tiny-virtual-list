<template>
  <div class="main">
    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>RenderBegin: {{ reactiveData.renderBegin }} </span>
      <span>RenderEnd: {{ reactiveData.renderEnd }} </span>
    </div>

    <div class="demo-table">
      <VirtualList
        :list="list"
        :minSize="40"
        ref="virtualListRef"
        itemKey="id"
        headerClass="header"
        :headerStyle="`width: ${1400}px;`"
        :listStyle="`width: ${1400}px;`"
      >
        <template #default="{ itemData }">
          <Item :itemData="itemData" />
        </template>
        <template #header>
          <div
            class="header-table-cell"
            style="
              width: 100px;
              position: sticky;
              left: 0;
              background-color: #fff;
              overflow: hidden;
            "
          >
            id
          </div>
          <div class="header-table-cell" style="width: 600px">原文</div>
          <div class="header-table-cell" style="width: 600px">译文</div>
          <div
            class="header-table-cell"
            style="
              width: 100px;
              position: sticky;
              right: 0;
              background-color: #fff;
            "
          >
            操作
          </div>
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
  name: 'DemoTable',
  components: {
    VirtualList,
    Item,
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
    this.reactiveData = (
      this.$refs.virtualListRef as InstanceType<typeof VirtualList>
    ).reactiveData;
  },
};
</script>

<style lang="scss">
.demo-table {
  width: 800px;
  height: 500px;
  background-color: #fff;
  overflow: hidden;
  border: 1px solid #000;

  .table-row {
    display: flex;
    width: min-content;
  }

  .header-table-cell {
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    background-color: #fff;
  }

  .table-cell {
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    background-color: #fff;
    padding: 10px;
  }
}

.header {
  height: 40px;
  line-height: 40px;
  display: flex;
  position: sticky;
  top: 0;
  z-index: 1;
  text-align: center;
  background: #fff;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
  width: min-content;
}
</style>
