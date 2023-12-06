<template>
  <div
    style="
      display: flex;
      align-items: center;
      min-height: 44px;
      border-bottom: 1px solid #ccc;
    "
  >
    <div style="width: 200px; padding: 4px; overflow: hidden">
      <div>{{ index }}</div>
      <div>{{ itemData.id }}</div>
    </div>
    <div
      ref="editor"
      contenteditable="true"
      style="
        flex: 1;
        align-items: center;
        border-left: 1px solid #ccc;

        padding: 6px 10px;
      "
      @input="changeInput"
    >
      {{ itemData.text }}
    </div>
    <!-- <span>{{ itemData.id }} - </span> -->
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
