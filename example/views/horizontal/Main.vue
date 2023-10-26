<template>
  <div class="main">
    <Operate
      :virtualListRef="$refs.virtualListRef"
      :length="list.length"
    ></Operate>

    <div class="demo">
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
import { VirtualList } from '../../../src';
import { getHorizontalList } from '../../utils/common';
import Item from './Item.vue';
import Operate from '../../components/Operate.vue';

export default {
  name: 'Horizontal',
  components: {
    VirtualList,
    Item,
    Operate,
  },
  data() {
    return {
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
