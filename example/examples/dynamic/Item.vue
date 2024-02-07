<template>
  <div class="row-item">
    <div style="width: 200px; min-height: 44px; padding: 4px; overflow: hidden">
      {{ index }} - {{ itemData.id }}
    </div>
    <div
      style="
        flex: 1;
        align-items: center;
        min-height: 44px;
        border-left: 1px solid #ccc;
        overflow: hidden;
      "
    >
      <div style="padding: 6px 10px" ref="editor" contenteditable="true" @input="changeInput">
        {{ itemData.text }}
      </div>
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
  mounted() {
    (this.$refs.editor as HTMLElement).innerText = this.itemData.text;
  },
  methods: {
    changeInput(evt: Event) {
      const { itemData } = this;
      itemData.text = (evt.target as HTMLElement).innerText;
    },
  },
};
</script>
<style lang="scss" scoped>
.row-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
</style>
