<template>
  <div class="main">
    <Operate
      :virtualListRef="$refs.virtualListRef"
      :length="list.length"
      :visible.sync="visible"
    ></Operate>

    <div class="demo-slot" v-show="visible">
      <VirtualList
        test="test"
        :buffer="2"
        :minSize="40"
        :list="list"
        ref="virtualListRef"
        itemKey="id"
        stickyHeaderStyle="text-align: center; height: 40px; background: #42b983;"
        headerStyle="text-align: center; height: 80px; background: cyan"
        footerStyle="text-align: center; height: 80px; background: cyan"
        stickyFooterStyle="text-align: center; height: 40px; background: #42b983;"
      >
        <template #default="{ itemData, index }">
          <Item :itemData="itemData" :index="index" />
        </template>
        <template #stickyHeader>
          <div>悬浮header</div>
        </template>
        <template #header>
          <div>header</div>
        </template>
        <template #footer>
          <div>footer</div>
        </template>
        <template #stickyFooter>
          <div>悬浮footer</div>
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
  name: 'DemoSlot',
  components: {
    VirtualList,
    Operate,
    Item,
  },
  data() {
    return {
      visible: true,
      list: getList(1000),
    };
  },
  async mounted() {
    // this.list = await getRows(1, 200000);
  },
  methods: {
    onTest() {
      console.log('test');
    },
  },
};
</script>

<style lang="scss">
.demo-slot {
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
