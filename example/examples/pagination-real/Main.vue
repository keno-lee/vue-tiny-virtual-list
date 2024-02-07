<template>
  <div
    class="demo-table"
    style="display: flex; flex-direction: column; align-items: center"
  >
    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>First Item In View: {{ firstItemKey }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>currentBeginPage: {{ page }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
      <span>currentEndPage: {{ page + pageCached }} </span>
      <span>&nbsp;&nbsp;&nbsp;</span>
    </div>
    <div class="demo">
      <!-- 触头触底 -->
      <RealList
        ref="normalListRef"
        :minSize="44"
        :list="list"
        :pageSize="pageSize"
        @toTop="onToTop"
        @toBottom="onToBottom"
        @updateCurrent="updateFirstItem"
        :itemKey="rowKeyName"
        :listStyle="`width: ${1500}px;`"
      >
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
            加载中...
          </div>
        </template>
        <template #default="{ itemData }">
          <ItemComponent :itemData="itemData" />
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
            <div v-if="page + pageCached <= maxPage - 1">加载中...</div>
            <div v-else>到底了....</div>
          </div>
        </template>
      </RealList>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue';
import { RealList } from '../../../src';
import { asyncGetList } from '../utils/common';
import ItemComponent from './Item.vue';

const list = ref<any>([]);
const maxPage = 10;
const page = ref(1);
const pageCached = 1;
const pageSize = 40;
const rowKeyName = 'id';
const firstItemKey = ref('');
const isLoading = ref(false);

const onToTop = async () => {
  console.log('onTop');
  if (isLoading.value) {
    return;
  }
  if (page.value <= 1) return;
  isLoading.value = true;

  const prevList = await asyncGetList(
    pageSize,
    (page.value - 2) * pageSize,
    1000,
  );
  const newRows = prevList.concat(list.value.slice(0, pageSize));
  list.value = newRows;

  nextTick(() => {
    page.value -= 1;
    isLoading.value = false;
  });
};

const onToBottom = async () => {
  console.log('onToBottom');
  if (isLoading.value) {
    return;
  }
  if (page.value + pageCached >= maxPage) {
    console.warn('已到最大页码', page.value);
    return;
  }
  isLoading.value = true;
  page.value += 1;
  const nextRows = await asyncGetList(
    pageSize,
    (page.value - 1) * pageSize,
    1000,
  );
  // 1. 先删除前面的
  const deleteRows = list.value.splice(0, pageSize);
  // 2. 加上新增的
  list.value = list.value.concat(nextRows);

  nextTick(() => {
    isLoading.value = false;
  });
};
const updateFirstItem = (key) => {
  firstItemKey.value = key;
};

onMounted(async () => {
  const pageList = await asyncGetList(pageSize, (page.value - 1) * pageSize);
  const pageListCache = await asyncGetList(pageSize, page.value * pageSize);
  list.value = pageList.concat(pageListCache);
  firstItemKey.value = list.value[0][rowKeyName];
});
</script>

<style lang="scss">
.demo-table {
  font-size: 14px;
  font-family: 'PingFang SC';

  .demo {
    width: 100%;
    height: 500px;
    background-color: #fff;
    overflow: hidden;
    border: 1px solid #000;
  }

  .loading-item {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
}
</style>
