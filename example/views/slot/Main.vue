<template>
  <div class="main">
    <Operate
      :virtualListRef="$refs.virtualListRef"
      :length="list.length"
    ></Operate>

    <div class="demo">
      <VirtualList
        test="test"
        :itemComponent="itemComponent"
        :buffer="2"
        :minSize="40"
        :list="list"
        ref="virtualListRef"
        itemKey="id"
        stickyHeaderStyle="height: 40px; background: green;"
        headerStyle="height: 80px; background: red"
        footerStyle="height: 80px; background: red"
        stickyFooterStyle="height: 40px; background: green;"
        @test="onTest"
      >
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

<script>
import { VirtualList } from '../../../src';
import { getList } from '../../utils/common';
import Item from './Item';
import Operate from '../../components/Operate.vue';

export default {
  name: 'Dynamic',
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
