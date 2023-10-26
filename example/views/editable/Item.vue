<template>
  <div
    contenteditable="true"
    style="
      min-height: 44px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding: 6px 10px;
    "
  >
    <span>{{ itemData.id }} - {{ itemData.text }}</span>
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
