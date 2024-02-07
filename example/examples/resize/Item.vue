<template>
  <div class="row-item">{{ index }} - {{ itemData.id }} - {{ itemData.text }}</div>
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
.row-item {
  min-height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
}
</style>
