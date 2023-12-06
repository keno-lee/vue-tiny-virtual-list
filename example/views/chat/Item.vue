<template>
  <div class="demo-cell">
    {{ itemData.index }} - {{ itemData.id }} - {{ itemData.text }}
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
.demo-cell {
  background-color: aliceblue;
  padding: 6px;
  border-radius: 4px;
}
</style>
