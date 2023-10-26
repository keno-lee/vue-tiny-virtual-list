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
      <span></span>
      <span v-show="loading">数据生成中，请稍等</span>
    </div>

    <span>当前加载行数 {{ list.length }} </span>

    <div class="demo">
      <VirtualList
        :buffer="5"
        ref="virtualListRef"
        :list="list"
        itemKey="id"
        :minSize="44"
      >
        <template #default="{ itemData }">
          <Item :itemData="itemData" @deleteItem="deleteItem" />
        </template>
      </VirtualList>
    </div>
  </div>
</template>

<script lang="ts">
import { VirtualList } from '../../../src';
import { asyncGetList } from '../../utils/common';
import Item from './Item.vue';

export default {
  name: 'Dynamic',
  components: {
    VirtualList,
    Item,
  },
  data() {
    return {
      list: [],
      number: 10000,

      loading: false,
    };
  },
  async created() {
    this.list = await asyncGetList(1);
  },
  methods: {
    async addItem2Bottom() {
      if (this.loading) return;

      this.loading = true;
      setTimeout(async () => {
        const newList = await asyncGetList(this.number, this.list.length);
        this.list = this.list.concat(newList);
        this.loading = false;

        this.$nextTick(() => {
          this.$refs.virtualListRef.scrollToBottom();
        });
      }, 0);
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
