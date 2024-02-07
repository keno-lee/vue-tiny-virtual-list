<template>
  <div class="main">
    <!-- <div>高性能、动态高度、增删</div> -->

    <button @click="onLoadData">加载30w数据</button>
    <span>&nbsp;</span>
    <span>&nbsp;</span>
    <span v-show="loading">数据生成中，请稍等</span>

    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderBegin: {{ reactiveData?.renderBegin }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>RenderEnd: {{ reactiveData?.renderEnd }} </span>
    </div>

    <div class="demo-dynamic">
      <VirtualList ref="virtualListRef" :buffer="5" :list="list" itemKey="id" :minSize="40">
        <template #default="{ itemData, index }">
          <Item :itemData="itemData" :index="index" @deleteItem="deleteItem" />
        </template>
      </VirtualList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref, nextTick, computed, shallowRef } from 'vue';
import type { Ref, ShallowRef } from 'vue';
import { VirtualList } from 'vue-tiny-virtual-list';
import { asyncGetList } from '../utils/common';
import Item from './Item.vue';

const loading = ref(false);
const virtualListRef: Ref<InstanceType<typeof VirtualList> | null> = ref(null);
const list: ShallowRef<any[]> = shallowRef([]);

const reactiveData = computed(() => {
  return virtualListRef.value?.reactiveData;
});

onMounted(() => {
  virtualListRef.value?.forceUpdate();
});
function onLoadData() {
  list.value = [];
  generateList(300000);
}

function generateList(length: number) {
  return new Promise((resolve) => {
    if (loading.value) return;
    loading.value = true;
    setTimeout(async () => {
      const newList = await asyncGetList(length, list.value.length);
      list.value = newList;
      loading.value = false;
    }, 0);
  });
}

function deleteItem(id: number) {
  const targetIndex = list.value.findIndex((row) => row.id === id);
  list.value.splice(targetIndex, 1);
}
</script>

<style lang="scss" scoped>
.demo-dynamic {
  width: 100%;
  height: 500px;
  background-color: var(--vp-sidebar-bg-color);
  overflow: hidden;
  border: 1px solid var(--vp-c-border);

  .row-item {
    display: flex;
  }

  .demo-cell {
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    padding: 4px;
  }
}
</style>
