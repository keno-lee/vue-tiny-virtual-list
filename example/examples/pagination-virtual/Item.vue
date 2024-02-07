<template>
  <div class="row-item">
    <div class="row-message">
      {{ itemData.index }} - {{ itemData.id }} - {{ itemData.text }}
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
.row-item {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 6px;

  .row-message {
    border-radius: 4px;
    padding: 10px;
    background-color: var(--color-bg-message);
  }
}
</style>
