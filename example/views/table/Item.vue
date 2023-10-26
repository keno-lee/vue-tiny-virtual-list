<template>
  <div class="table-row">
    <div
      class="table-cell"
      style="
        width: 100px;
        position: sticky;
        left: 0;
        background-color: #fff;
        box-shadow: 8px 0 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      "
    >
      {{ itemData.id }}
    </div>
    <div class="table-cell" style="width: 600px">{{ itemData.text }}</div>
    <div class="table-cell" style="width: 600px">{{ itemData.text1 }}</div>
    <div
      class="table-cell"
      style="
        width: 100px;
        position: sticky;
        right: 0;
        background-color: #fff;
        box-shadow: -8px 0 20px rgba(0, 0, 0, 0.1);
      "
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
  },
};
</script>
