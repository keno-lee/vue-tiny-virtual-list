<template>
  <div class="main">
    <Operate
      :virtualListRef="$refs.virtualListRef"
      :length="list.length"
      :visible.sync="visible"
    ></Operate>

    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>RenderBegin: {{ reactiveData.renderBegin }} </span>
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
        <template #default="{ itemData }">
          <Item :itemData="itemData" />
        </template>
      </VirtualList>
    </div>
  </div>
</template>

<script lang="ts">
import { VirtualList } from '@/src/index';
import Operate from '@/example/components/OperateGroup.vue';
import { getHorizontalList } from '@/example/utils/common';
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
      list: getHorizontalList(1000),

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
.demo-horizontal {
  width: 800px;
  height: 120px;
  background-color: #fff;
  overflow: hidden;
  border: 1px solid #000;

  .demo-col {
    height: 100%;
    border-bottom: 1px solid #000;
    border-left: 1px solid #000;
    padding: 4px;
    box-sizing: border-box;
  }
}
</style>
