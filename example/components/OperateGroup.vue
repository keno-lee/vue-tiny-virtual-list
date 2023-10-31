<template>
  <div class="operate-wrap">
    <div class="operate">
      <div class="operate-item">
        <button class="operate-btn" @click="goScrollOffset">
          scrollTo(px)
        </button>
        <input class="operate-input" type="number" v-model="scrollToOffset" />
      </div>
      <div class="operate-item">
        <button class="operate-btn" @click="goScrollIndex">
          scrollTo(index)
        </button>
        <input class="operate-input" type="number" v-model="scrollToIndex" />
      </div>
      <div class="operate-item">
        <button class="operate-btn" @click="goScrollIntoView">
          show(index)
        </button>
        <input
          class="operate-input"
          type="number"
          v-model="scrollIntoViewIndex"
        />
        <button @click="goScrollIntoViewPrev">prev</button>
        <button @click="goScrollIntoViewNext">next</button>
      </div>
      <div class="operate-item">
        <button class="operate-btn" @click="goScrollTop">toTop</button>
      </div>
      <div class="operate-item">
        <button class="operate-btn" @click="goScrollBottom">toBottom</button>
      </div>
      <div class="operate-item">
        <button class="operate-btn" @click="showIt">visible/hidden</button>
      </div>
      <!-- <div class="operate-item">
        <button class="operate-btn" @click="renderIt">渲染/卸载</button>
      </div> -->
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'OperateGroup',
  props: {
    virtualListRef: {
      type: Object,
      default: () => ({}),
    },
    length: {
      type: Number,
      default: 0,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      scrollToIndex: 10,
      scrollToOffset: 200,
      scrollIntoViewIndex: 20,
    };
  },
  methods: {
    async goScrollIndex() {
      this.virtualListRef.scrollToIndex(this.scrollToIndex);
    },
    goScrollOffset() {
      this.virtualListRef.scrollToOffset(this.scrollToOffset);
    },
    async goScrollIntoView() {
      this.virtualListRef.scrollIntoView(this.scrollIntoViewIndex);
    },
    goScrollIntoViewPrev() {
      const t = Number(this.scrollIntoViewIndex);
      this.scrollIntoViewIndex = t - 1;
      this.goScrollIntoView();
    },
    goScrollIntoViewNext() {
      const t = Number(this.scrollIntoViewIndex);
      this.scrollIntoViewIndex = t + 1;
      this.goScrollIntoView();
    },
    async goScrollTop() {
      await this.virtualListRef.scrollToTop();
    },
    async goScrollBottom() {
      await this.virtualListRef.scrollToBottom();
      console.log('已到底部');
    },
    showIt() {
      // console.log('showIt');
      this.$emit('update:visible', !this.visible);
    },
    renderIt() {
      console.log('renderIt');
    },
  },
};
</script>
<style lang="scss">
.operate-wrap {
  padding: 10px 0;
  .operate {
    display: flex;
    flex-wrap: wrap;

    .operate-item {
      user-select: none;
      display: flex;
      margin-right: 20px;
      // margin-bottom: 20px;

      .operate-btn {
        padding: 2px 6px;
      }

      .operate-input {
        width: 60px;
      }
    }
  }
}
</style>
