<template>
  <div class="main">
    <Operate
      :virtualListRef="$refs.virtualListRef"
      :length="list.length"
    ></Operate>

    <div class="demo">
      <VirtualList
        :list="list"
        :itemComponent="itemComponent"
        ref="virtualListRef"
        :minSize="60"
        horizontal
        itemKey="id"
        :buffer="2"
      >
      </VirtualList>
    </div>
  </div>
</template>

<script>
import { VirtualList } from '../../../src';
import { getHorizontalList } from '../../utils/common';
import Item from './Item.vue';
import Operate from '../../components/Operate.vue';

export default {
  name: 'Horizontal',
  components: {
    VirtualList,
    Operate,
  },
  data() {
    return {
      itemComponent: Item,

      list: getHorizontalList(2000),
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.list = ;
    // }, 1000);
  },
};
</script>

<style lang="scss">
.demo {
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
