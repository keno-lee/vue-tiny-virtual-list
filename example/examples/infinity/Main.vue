<template>
  <div class="main">
    <!-- <Operate
      :virtualListRef="$refs.virtualListRef"
      :length="list.length"
      :visible.sync="visible"
    ></Operate> -->

    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderBegin: {{ reactiveData.renderBegin }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderEnd: {{ reactiveData.renderEnd }} </span>
    </div>

    <div class="demo-infinity" v-show="visible">
      <VirtualList
        ref="virtualListRef"
        :list="list"
        itemKey="id"
        :minSize="40"
        :buffer="2"
        @toBottom="toBottom"
      >
        <template #default="{ itemData, index }">
          <Item :itemData="itemData" :index="index" />
        </template>
        <template #footer>
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
// import Operate from '../components/OperateGroup.vue';

export default {
  name: 'DemoInfinity',
  components: {
    Item,
    VirtualList,
    // Operate,
  },
  data() {
    return {
      visible: true,
      list: [] as any[],
      reactiveData: {
        renderBegin: 0,
        renderEnd: 0,
      },
    };
  },
  async created() {
    this.list = await asyncGetList(200);
  },
  mounted() {
    this.reactiveData = (this.$refs.virtualListRef as any).reactiveData;
  },
  methods: {
    async toBottom() {
      console.log('toBottom');
      const list = await asyncGetList(200, this.list.length, 1000);
      this.list = this.list.concat(list);
    },
  },
};
</script>

<style lang="scss" scoped>
.demo-infinity {
  width: 100%;
  height: 500px;
  background-color: var(--vp-sidebar-bg-color);
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
}
</style>
