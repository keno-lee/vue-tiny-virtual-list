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

    <div class="demo-fixed" style="resize: auto" v-show="visible">
      <VirtualList
        :buffer="2"
        :list="list"
        ref="virtualListRef"
        itemKey="id"
        :minSize="40"
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
import Operate from '@/example/components/OperateGroup.vue';

export default {
  name: 'DemoFixed',
  components: {
    Item,
    VirtualList,
    Operate,
  },
  data() {
    return {
      visible: true,
      virtualListRef: null,
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

<style lang="scss" scoped>
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
  }
}
</style>
