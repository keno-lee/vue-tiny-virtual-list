<template>
  <div class="row-item">
    <div class="row-message">
      {{ itemData.index }} - {{ itemData.id }} - {{ itemData.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  itemData: any;
}>();
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
