<template>
  <div class="main">
    <Operate
      :virtualListRef="$refs.virtualListRef"
      :length="list.length"
      :visible.sync="visible"
    ></Operate>

    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderBegin: {{ reactiveData.renderBegin }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderEnd: {{ reactiveData.renderEnd }} </span>
    </div>

    <div class="demo-horizontal" v-show="visible">
      <VirtualList
        :list="list"
        ref="virtualListRef"
        :minSize="60"
        horizontal
        itemKey="id"
        :buffer="2"
      >
        <template #default="{ itemData, index }">
          <Item :itemData="itemData" :index="index" />
        </template>
      </VirtualList>
    </div>
  </div>
</template>

<script lang="ts">
import { VirtualList } from 'vue-tiny-virtual-list';
import Operate from '../components/OperateGroup.vue';
import { getHorizontalList } from '../utils/common';
import Item from './Item.vue';

export default {
  name: 'DemoHorizontal',
  components: {
    VirtualList,
    Item,
    Operate,
  },
  data() {
    return {
      visible: true,
      list: [] as any[],

      reactiveData: {
        renderBegin: 0,
        renderEnd: 0,
      },
    };
  },
  mounted() {
    this.reactiveData = (this.$refs.virtualListRef as any).reactiveData;
    this.list = getHorizontalList(1000);
  },
};
</script>

<style lang="scss" scoped>
.demo-horizontal {
  width: 100%;
  height: 120px;
  background-color: var(--vp-sidebar-bg-color);
  overflow: hidden;
  border: 1px solid var(--vp-c-border);

  .demo-col {
    height: 100%;
    border-bottom: 1px solid #000;
    border-left: 1px solid #000;
    padding: 4px;
    box-sizing: border-box;
  }
}
</style>
