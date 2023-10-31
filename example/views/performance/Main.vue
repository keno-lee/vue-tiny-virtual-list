<template>
  <div class="main">
    <div>高性能、动态高度、增删</div>
    <div class="button-group">
      <button @click="manualAddList">Manual Add List</button>
      <span>(</span>
      <input type="text" v-model="manualNumber" />
      <span>per)</span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <button @click="autoAddList">
        {{ autoFlag ? 'Stop Add List' : 'Auto Add List' }}
      </button>
      <span>(</span>
      <input type="text" v-model="autoNumber" />
      <span>per)</span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <span v-show="loading">数据生成中，请稍等</span>
    </div>

    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>RenderBegin: {{ reactiveData.renderBegin }} </span>
      <span>RenderEnd: {{ reactiveData.renderEnd }} </span>
    </div>

    <div class="demo-dynamic">
      <VirtualList
        ref="virtualListRef"
        :buffer="5"
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
import { VirtualList } from '@/src/index';
import { asyncGetList } from '@/example/utils/common';
import Item from './Item.vue';

export default {
  name: 'DemoDynamic',
  components: {
    VirtualList,
    Item,
  },
  data() {
    return {
      list: [] as any[],

      manualNumber: 1000,
      autoNumber: 10,
      autoFlag: false,
      loading: false,
      reactiveData: {
        renderBegin: 0,
        renderEnd: 0,
      },
    };
  },
  async created() {
    this.list = await asyncGetList(1);
  },
  mounted() {
    this.reactiveData = (
      this.$refs.virtualListRef as InstanceType<typeof VirtualList>
    ).reactiveData;
  },
  methods: {
    generateList(length: number) {
      return new Promise((resolve) => {
        if (this.loading) return;
        this.loading = true;
        setTimeout(async () => {
          const newList = await asyncGetList(length, this.list.length);
          this.list = this.list.concat(newList);
          this.loading = false;

          this.$nextTick(() => {
            (
              this.$refs.virtualListRef as InstanceType<typeof VirtualList>
            ).scrollToBottom();
            resolve(null);
          });
        }, 0);
      });
    },
    async manualAddList() {
      this.autoFlag = false;
      return this.generateList(this.manualNumber);
    },
    async autoGenerate() {
      if (this.autoFlag) {
        await this.generateList(this.autoNumber);
        this.autoGenerate();
      }
    },
    async autoAddList() {
      this.autoFlag = !this.autoFlag;
      this.autoGenerate();
    },
    deleteItem(id: number) {
      const targetIndex = this.list.findIndex((row) => row.id === id);
      this.list.splice(targetIndex, 1);
    },
  },
};
</script>

<style lang="scss">
.demo-dynamic {
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
