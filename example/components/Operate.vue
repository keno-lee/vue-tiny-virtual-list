<template>
  <div class="operate-wrap">
    <div class="operate">
      <div class="operate-item">
        <button class="operate-btn" @click="goScrollOffset">滚动到(px)</button>
        <input class="operate-input" type="number" v-model="scrollToOffset" />
      </div>
      <div class="operate-item">
        <button class="operate-btn" @click="goScrollIndex">
          滚动到(index)
        </button>
        <input class="operate-input" type="number" v-model="scrollToIndex" />
      </div>
      <div class="operate-item">
        <button class="operate-btn" @click="goScrollIntoView">
          显示(index)
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
        <button class="operate-btn" @click="goScrollTop">去顶部</button>
      </div>
      <div class="operate-item">
        <button class="operate-btn" @click="goScrollBottom">去底部</button>
      </div>
      <div class="operate-item">
        <button class="operate-btn" @click="showIt">显示/隐藏</button>
      </div>
      <div class="operate-item">
        <button class="operate-btn" @click="renderIt">渲染/卸载</button>
      </div>
      <slot></slot>
    </div>

    <div>
      <span>当前加载行数 {{ length }} </span>
      <span> </span>
      <span>Prev[0-1] Render[1-10] Behind[10-20]</span>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Operate',
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
  padding: 4px 0;
  .operate {
    display: flex;
    flex-wrap: wrap;

    .operate-item {
      user-select: none;
      display: flex;
      margin-right: 20px;
      margin-bottom: 20px;

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
