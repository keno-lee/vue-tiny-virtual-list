<template>
  <div class="main">
    <Operate
      :virtualListRef="virtualListRef"
      :length="list.length"
      :visible.sync="visible"
    ></Operate>

    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderBegin: {{ reactiveData.renderBegin }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderEnd: {{ reactiveData.renderEnd }} </span>
    </div>

    <div class="demo-chat" v-show="visible">
      <VirtualList
        ref="virtualListRef"
        :list="list"
        itemKey="index"
        :minSize="60"
        @toTop="toTop"
        @itemResize="itemResize"
      >
        <template #default="{ itemData, index }">
          <Item :itemData="itemData" :index="index" />
        </template>
        <template #header v-if="page > 1">
          <div
            style="
              width: 100%;
              height: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: chocolate;
            "
          >
            loading...
          </div>
        </template>
      </VirtualList>
    </div>
  </div>
</template>

<script lang="ts">
import { VirtualList } from 'vue-tiny-virtual-list';
import { asyncGetList } from '../utils/common';
import Item from './Item.vue';
import Operate from '../components/OperateGroup.vue';

export default {
  name: 'DemoChat',
  components: {
    Item,
    VirtualList,
    Operate,
  },
  data() {
    return {
      visible: true,
      list: [] as any[],
      reactiveData: {
        renderBegin: 0,
        renderEnd: 0,
      },
      isFirstRender: true,

      pageMax: 5,
      page: 5,
      pageSize: 40,

      loading: false,
      virtualListRef: null as typeof VirtualList | null,
    };
  },
  async created() {
    this.list = await asyncGetList(this.pageSize, (this.page - 1) * this.pageSize);
  },
  mounted() {
    this.virtualListRef = this.$refs.virtualListRef as typeof VirtualList;
    this.reactiveData = this.virtualListRef.reactiveData;
  },
  methods: {
    async toTop() {
      console.log('toTop');
      if (this.loading || this.page <= 1) return;

      this.loading = true;

      const list = await asyncGetList(this.pageSize, (this.page - 2) * this.pageSize, 1000);
      // console.log(list);
      this.list = list.concat(this.list);

      // 滚动到正确位置
      this.$nextTick(() => {
        this.virtualListRef?.addedList2Top(list);
        // 数据更新后再更新page，这样上面的loading消失时机才能正确
        this.page -= 1;
        this.loading = false;
      });
    },
    itemResize() {
      if (this.isFirstRender) {
        this.isFirstRender = false;
        this.virtualListRef?.scrollToBottom();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-chat {
  width: 100%;
  height: 500px;
  background-color: var(--vp-sidebar-bg-color);
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
}
</style>
