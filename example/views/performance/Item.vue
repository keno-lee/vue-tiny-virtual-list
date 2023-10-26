<template>
  <div
    style="
      min-height: 44px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding: 0 10px;
    "
  >
    <div style="flex: 1">{{ itemData.id }} - {{ itemData.text }}</div>
    <button style="height: 20px" @click="deleteItem(itemData.id)">删除</button>
  </div>
</template>

<script>
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
    },
  },
  methods: {
    deleteItem(id) {
      this.$emit('deleteItem', id);
    },
  },
};
</script>
