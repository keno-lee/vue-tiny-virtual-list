<template>
  <div class="demo-cell" style="height: 40px">
    {{ itemData.index }} - {{ itemData.id }}
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
