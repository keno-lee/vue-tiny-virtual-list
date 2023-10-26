<template>
  <div class="main">
    <!-- <Operate
      :virtualListRef="$refs.virtualListRef"
      :length="list.length"
      :visible.sync="visible"
    >
      <div class="operate-item">
        <button class="operate-btn" @click="addItems">增加1000条</button>
      </div>
    </Operate> -->

    <div>高性能、动态高度、增删</div>
    <div class="button-group">
      <button @click="addItem2Bottom">向底部添加</button>
      <input type="text" v-model="number" />
    </div>

    <span>当前加载行数 {{ list.length }} </span>

    <div class="demo" v-show="visible">
      <VirtualList
        :buffer="5"
        ref="virtualListRef"
        :itemComponent="itemComponent"
        :list="list"
        itemKey="id"
        :minSize="44"
        @deleteItem="deleteItem"
      >
      </VirtualList>
    </div>
  </div>
</template>

<script>
import { VirtualList } from '../../../src';
import { getList } from '../../utils/common';
import Item from './Item.vue';
// import Operate from '../../components/Operate.vue';

export default {
  name: 'Dynamic',
  components: {
    VirtualList,
    // Operate,
  },
  data() {
    return {
      itemComponent: Item,
      visible: true,
      list: [],

      number: 10000,
    };
  },
  created() {
    this.list = getList(1);
  },
  methods: {
    addItem2Top() {
      const newList = getList(this.number);
      this.list.unshift(...getList(this.number));
      this.$nextTick(() => {
        this.$refs.virtualListRef.scrollToTop();
      });
      // requestAnimationFrame(() => {
      // let reduce = 0;
      // newList.forEach((item) => {
      //   const size = this.$refs.virtualListRef.getItemSize(item.id);
      //   console.log('size', size);
      //   reduce += size;
      // });
      // this.$refs.virtualListRef.scrollToOffset(
      //   this.$refs.virtualListRef.getOffset() + reduce,
      // );
      // });
    },
    addItem2Bottom() {
      this.list.push(...getList(this.number));
      this.$nextTick(() => {
        this.$refs.virtualListRef.scrollToBottom();
      });
    },
    deleteItem(id) {
      const targetIndex = this.list.findIndex((row) => row.id === id);
      this.list.splice(targetIndex, 1);
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
