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
    <div style="flex: 1">
      {{ itemData.index }} - {{ itemData.id }} - {{ itemData.text }}
    </div>
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
  },
  methods: {
    deleteItem(id: string) {
      this.$emit('deleteItem', id);
    },
  },
};
</script>
