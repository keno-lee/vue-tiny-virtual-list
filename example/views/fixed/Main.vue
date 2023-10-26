<template>
  <div class="main">
    <Operate
      :virtualListRef="$refs.virtualListRef"
      :length="list.length"
    ></Operate>

    <div class="demo" style="resize: auto">
      <VirtualList
        :buffer="2"
        :list="list"
        :itemComponent="itemComponent"
        ref="virtualListRef"
        itemKey="id"
        :minSize="40"
        fixed
      >
      </VirtualList>
    </div>
  </div>
</template>

<script>
import { VirtualList } from '../../../src';
import { getList } from '../../utils/common';
import Item from './Item.vue';
import Operate from '../../components/Operate.vue';

export default {
  name: 'Fixed',
  components: {
    VirtualList,
    Operate,
  },
  data() {
    return {
      itemComponent: Item,

      list: getList(2000),
    };
  },
};
</script>

<style lang="scss">
.demo {
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
