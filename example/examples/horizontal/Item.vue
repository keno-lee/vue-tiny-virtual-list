<template>
  <div
    class="demo-col"
    :style="`height: 100px; min-width: ${itemData.width}px;`"
  >
    <div>{{ itemData.id }}</div>
    <div>{{ itemData.width }} px</div>
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
