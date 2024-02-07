<template>
  <div class="table-row">
    <div
      class="table-cell"
      style="
        width: 200px;
        position: sticky;
        left: 0;
        background-color: var(--vp-sidebar-bg-color);
        overflow: hidden;
      "
    >
      {{ index }} - {{ itemData.id }}
    </div>
    <div class="table-cell" style="width: 600px">{{ itemData.text }}</div>
    <div class="table-cell" style="width: 600px">{{ itemData.text }}</div>
    <div
      class="table-cell"
      style="width: 100px; position: sticky; right: 0; background-color: var(--vp-sidebar-bg-color)"
    >
      操作
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    itemData: {
      type: Object,
      default() {
        return {};
      },
    },
    index: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style lang="scss" scoped>
.table-row {
  display: flex;
  width: min-content;
}
.table-cell {
  border-right: 1px solid var(--vp-c-border);
  border-bottom: 1px solid var(--vp-c-border);
  padding: 10px;

  &:last-child {
    border-right: none;
  }
}
</style>
