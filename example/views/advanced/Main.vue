<template>
  <div class="main">
    <div>高阶用法，使用前需要掌握虚拟列表的基本原理</div>
    <div>通过 useVirtualList() 函数，</div>

    <pre>
      const {
        resizeObserver,
        reactiveData, 
        filterList, 
        clientRefEl,
        stickyHeaderRefEl
      } = useVirtualList({
        list: gridStore.source.list,
        minSize: 32,
        itemKey: 'id',
        controlRender 
      }, context);
    </pre>
    <div>
      传入3个基本的参数，返回dom的结构，自定义布局页面，下面给出合并单元格的`&lt;table>&lt;/table>`布局示例:
    </div>
    <div>
      这里只是简单的合并单元格表格示例，有需要的可以作为参考，并自己做好性能处理。后续计划中会在一个高性能的独立表格组件提供出来
    </div>

    <div style="padding: 10px 0">
      <span>Total: {{ list.length }} </span>
      <span>RenderBegin: {{ reactiveData.renderBegin }} </span>
      <span>RenderEnd: {{ reactiveData.renderEnd }} </span>
    </div>

    <div class="demo-fixed" style="resize: auto">
      <div
        ref="clientRefEl"
        data-id="client"
        style="width: 100%; height: 100%; overflow: overlay"
      >
        <!-- 滚动条骨架 -->
        <div :style="`float: left; ${dynamicListStyle}`"></div>
        <table cellspacing="0" cellpadding="0" :style="`width: ${fullWidth}px`">
          <thead
            ref="stickyHeaderRefEl"
            data-id="stickyHeader"
            class="grid-header"
            style="position: sticky; top: 0; background-color: #fff"
          >
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                style="
                  border-right: 1px solid #000;
                  border-bottom: 1px solid #000;
                  background-color: #ccc;
                  height: 32px;
                "
              >
                {{ column.title }}
              </th>
            </tr>
          </thead>
          <colgroup>
            <col
              v-for="column in columns"
              :key="column.key"
              :width="column.width"
            />
          </colgroup>
          <tbody>
            <tr :style="`height: ${reactiveData.virtualSize}px;`"></tr>

            <template v-for="row in renderList">
              <Item
                :key="row.id"
                :resizeObserver="resizeObserver"
                :row="row"
                :columns="columns"
                :data-id="row.id"
                :data-level="row.level"
              ></Item>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useVirtualList } from '@/src/index';
import Item from './Item.vue';
import { computed } from 'vue';

const columns = [
  { key: 'id', title: 'ID', width: 100 },
  { key: 'name', title: 'Name', width: 100 },
  { key: 'age', title: 'Age', width: 100 },
  { key: 'address', title: 'Address', width: 200 },
  { key: 'description', title: 'Description', width: 200 },
  { key: 'description1', title: 'Description1', width: 200 },
  { key: 'description2', title: 'Description2', width: 200 },
  { key: 'description3', title: 'Description3', width: 200 },
  { key: 'description4', title: 'Description4', width: 200 },
];

const list: any[] = [];
for (let i = 0; i < 100; i += 1) {
  list.push({
    id: i,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    description1:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    description2:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    description3:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    description4:
      'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  });
}

// 通过 controlRender 来完成合并单元格计算
function controlRender(begin: number, end: number) {
  if (begin === 0 || begin === 1) {
    return {
      begin: 0,
      end,
    };
  }
  return {
    begin,
    end,
  };
}

const fullWidth = columns.reduce(
  (total, column: any) => total + column?.width ?? 200,
  0,
);

const emitFunction = {
  scroll: () => {
    // console.log('scroll');
  },
  toTop: () => {
    // console.log('toTop');
  },
  toBottom: () => {
    // console.log('toBottom');
  },
  itemResize: () => {
    // console.log('itemResize');
  },
};

const {
  resizeObserver,
  reactiveData,
  renderList,
  clientRefEl,
  stickyHeaderRefEl,
} = useVirtualList(
  { list: list, minSize: 100, itemKey: 'id', controlRender },
  emitFunction,
);
console.log('reactiveData', reactiveData);
const dynamicListStyle = computed(() => {
  return `will-change: height; min-height: ${reactiveData.listTotalSize}px;`;
});
</script>

<style lang="scss">
.demo-fixed {
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
    padding: 4px;
  }

  table {
    table-layout: fixed;
    border-spacing: 0;
    outline: none;
  }
}
</style>
