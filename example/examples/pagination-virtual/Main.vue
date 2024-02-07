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
        @toBottom="toBottom"
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
        <template #footer v-if="page < pageMax">
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

      pageMax: 10,
      page: 10,
      pageSize: 20,

      loading: false,
      abortTop: false,
      abortBottom: false,

      virtualListRef: null as typeof VirtualList | null,
    };
  },
  async created() {
    const pageList = await asyncGetList(this.pageSize, (this.page - 1) * this.pageSize);
    // 多请求一页缓存
    const pageListCache = await asyncGetList(this.pageSize, this.page * this.pageSize);
    this.list = pageList.concat(pageListCache);
  },
  mounted() {
    this.virtualListRef = this.$refs.virtualListRef as typeof VirtualList;
    this.reactiveData = this.virtualListRef?.reactiveData;
  },
  methods: {
    async toTop() {
      console.log('toTop');
      this.abortBottom = true;
      if (this.loading || this.page <= 1) {
        if (!this.loading) this.abortBottom = false;
        return;
      }

      this.loading = true;

      const list = await asyncGetList(this.pageSize, (this.page - 2) * this.pageSize, 1000);
      // console.log(list);
      if (this.reactiveData.renderEnd >= this.pageSize) {
        this.loading = false;
        if (this.abortTop) {
          this.abortBottom = false;
          await this.toBottom();
        }
        return;
      }
      this.list = list.concat(this.list.slice(0, this.pageSize));
      this.abortBottom = false;

      // 滚动到正确位置
      this.$nextTick(() => {
        this.virtualListRef?.addedList2Top(list);
        // 数据更新后再更新page，这样上面的loading消失时机才能正确
        this.page -= 1;
        this.loading = false;
      });
    },
    async toBottom() {
      console.log('toBottom');
      this.abortTop = true;
      if (this.loading || this.page >= this.pageMax) {
        if (!this.loading) this.abortTop = false;
        return;
      }

      this.loading = true;
      const list = await asyncGetList(this.pageSize, (this.page + 1) * this.pageSize, 1000);
      // 如果滚动到即将要删除的页面，中断操作
      if (this.reactiveData.renderBegin < this.pageSize) {
        this.loading = false;
        if (this.abortBottom) {
          this.abortTop = false;
          await this.toTop();
        }
        return;
      }
      const delRows = this.list.splice(0, this.pageSize);
      this.list = this.list.concat(list);
      this.abortTop = false;
      this.$nextTick(() => {
        this.virtualListRef?.deletedList2Top(delRows);
        this.page += 1;
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
