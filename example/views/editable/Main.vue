<template>
  <div class="main">
    <Operate
      :virtualListRef="virtualListRef"
      :length="list.length"
      :visible.sync="visible"
    >
    </Operate>
    <div class="demo">
      <VirtualList
        :buffer="5"
        ref="virtualListRef"
        :list="list"
        itemKey="id"
        :minSize="20"
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
import { getList } from '../../utils/common';
import Item from './Item.vue';
import Operate from '../../components/Operate.vue';

export default {
  name: 'Dynamic',
  components: {
    VirtualList,
    Operate,
    Item,
  },
  data() {
    return {
      visible: true,
      list: getList(200),
      virtualListRef: {},
    };
  },
  mounted() {
    this.virtualListRef = this.$refs.virtualListRef;
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
