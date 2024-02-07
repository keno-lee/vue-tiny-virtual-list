<template>
  <div class="row-item">
    <div style="flex: 1">{{ index }} - {{ itemData.id }} - {{ itemData.text }}</div>
    <button style="height: 20px" @click="deleteItem(itemData.id)">删除</button>
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
  methods: {
    deleteItem(id: string) {
      this.$emit('deleteItem', id);
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
