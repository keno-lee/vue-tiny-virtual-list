<template>
  <div class="row-item">{{ index }} - {{ itemData.id }}</div>
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
  height: 40px;
  border-bottom: 1px solid var(--vp-c-border);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
