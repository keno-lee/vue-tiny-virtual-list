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
      <span>RenderBegin: {{ reactiveData?.renderBegin }} </span>
      <span>RenderEnd: {{ reactiveData?.renderEnd }} </span>
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

<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  ref,
  nextTick,
  computed,
  shallowRef,
} from 'vue';
import type { Ref, ShallowRef } from 'vue';
import { VirtualList } from '@/src/index';
import { asyncGetList } from '@/example/utils/common';
import Item from './Item.vue';

const manualNumber = ref(1000);
const autoNumber = ref(10);
const autoFlag = ref(false);
const loading = ref(false);
const virtualListRef: Ref<InstanceType<typeof VirtualList> | null> = ref(null);
const list: ShallowRef<any[]> = shallowRef([]);

const reactiveData = computed(() => {
  return virtualListRef.value?.reactiveData;
});

onBeforeMount(async () => {
  list.value = await asyncGetList(1);
});

onMounted(() => {
  virtualListRef.value?.forceUpdate();
});

function generateList(length: number) {
  return new Promise((resolve) => {
    if (loading.value) return;
    loading.value = true;
    setTimeout(async () => {
      const newList = await asyncGetList(length, list.value.length);
      list.value = list.value.concat(newList);
      loading.value = false;

      nextTick(() => {
        virtualListRef.value?.scrollToBottom();
        resolve(null);
      });
    }, 0);
  });
}
async function manualAddList() {
  autoFlag.value = false;
  return generateList(manualNumber.value);
}
async function autoGenerate() {
  if (autoFlag.value && list.value.length < 700002) {
    await generateList(autoNumber.value);
    autoGenerate();
  }
}
async function autoAddList() {
  autoFlag.value = !autoFlag.value;
  autoGenerate();
}
function deleteItem(id: number) {
  const targetIndex = list.value.findIndex((row) => row.id === id);
  list.value.splice(targetIndex, 1);
}
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
