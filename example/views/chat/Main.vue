<template>
  <div class="main">
    <Operate
      :virtualListRef="$refs.virtualListRef"
      :length="list.length"
      :visible.sync="visible"
    ></Operate>

    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>RenderBegin: {{ reactiveData.renderBegin }} </span>
      <span>RenderEnd: {{ reactiveData.renderEnd }} </span>
    </div>

    <div class="demo-chat" v-show="visible">
      <VirtualList
        ref="virtualListRef"
        :list="list"
        itemKey="index"
        :minSize="60"
        itemClass="chat-item"
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
import { VirtualList } from '@/src/index';
import { asyncGetList } from '@/example/utils/common';
import Item from './Item.vue';
import Operate from '@/example/components/OperateGroup.vue';

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
    };
  },
  async created() {
    this.list = await asyncGetList(
      this.pageSize,
      (this.page - 1) * this.pageSize,
    );
  },
  mounted() {
    this.reactiveData = (this.$refs.virtualListRef as any).reactiveData;
  },
  methods: {
    async toTop() {
      console.log('toTop');
      if (this.loading || this.page <= 1) return;

      this.loading = true;

      const list = await asyncGetList(
        this.pageSize,
        (this.page - 2) * this.pageSize,
        1000,
      );
      // console.log(list);
      this.list = list.concat(this.list);

      // 滚动到正确位置
      this.$nextTick(() => {
        // 计算高度
        let re = 0;
        list.forEach((item) => {
          const currentSize = (this.$refs.virtualListRef as any).getItemSize(
            item.index,
          );
          re += currentSize;
        });

        // 需要纠正高度，防止抖动
        (this.$refs.virtualListRef as any).scrollToOffset(re, true);
        // 数据更新后再更新page，这样上面的loading消失时机才能正确
        this.page -= 1;
        this.loading = false;
      });
    },
    itemResize() {
      if (this.isFirstRender) {
        this.isFirstRender = false;
        (this.$refs.virtualListRef as any).scrollToBottom();
      }
    },
  },
};
</script>

<style lang="scss">
.demo-chat {
  width: 800px;
  height: 500px;
  background-color: #fff;
  overflow: hidden;
  border: 1px solid #000;

  .demo-row {
    display: flex;
  }

  .chat-item {
    width: 100%;
    padding: 10px;
  }
}
</style>
