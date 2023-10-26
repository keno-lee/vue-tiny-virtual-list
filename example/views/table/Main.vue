<template>
  <div class="main">
    <Operate
      :virtualListRef="$refs.virtualListRef"
      :length="list.length"
    ></Operate>

    <div class="table">
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
import { VirtualList } from '../../../src';
import { getList } from '../../utils/common';
import Item from './Item.vue';
import Operate from '../../components/Operate.vue';

export default {
  name: 'DemoTable',
  components: {
    VirtualList,
    Operate,
    Item,
  },
  data() {
    return {
      list: getList(2000),
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.list = await getRows(1, 2000);
    // }, 1000);
  },
};
</script>

<style lang="scss">
.table {
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
