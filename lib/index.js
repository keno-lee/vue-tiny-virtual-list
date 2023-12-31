import { defineComponent, ref, onMounted, onBeforeUnmount, reactive, onBeforeMount, shallowRef, watch, isVue2 } from "vue-demi";
import { h } from "vue";
function polyfillAttr(rest, attrs) {
  return isVue2 ? {
    ...rest,
    attrs
  } : {
    ...rest,
    ...attrs
  };
}
function polyfillChildren(children) {
  return isVue2 ? children : {
    default: () => children
  };
}
function polyfillSlot(slot) {
  return isVue2 ? slot : slot == null ? void 0 : slot();
}
const ObserverItem = defineComponent({
  name: "ObserverItem",
  props: {
    resizeObserver: {
      type: ResizeObserver,
      require: true
    },
    id: {
      type: [String, Number],
      require: true
    },
    unmount: {
      type: Function,
      default: void 0
    }
  },
  setup(props) {
    const itemRefEl = ref(null);
    onMounted(() => {
      if (props.resizeObserver && itemRefEl.value) {
        props.resizeObserver.observe(itemRefEl.value);
      }
    });
    onBeforeUnmount(() => {
      if (props.resizeObserver && itemRefEl.value) {
        props.resizeObserver.unobserve(itemRefEl.value);
      }
      if (props.unmount) {
        props.unmount();
      }
    });
    return {
      itemRefEl
    };
  },
  render() {
    const {
      id
    } = this;
    return h("div", polyfillAttr({
      ref: "itemRefEl"
    }, {
      "data-id": id
    }), [polyfillSlot(this.$slots.default)]);
  }
});
const VirtualList = defineComponent({
  name: "VirtualList",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    itemKey: {
      type: [String, Number],
      required: true
    },
    minSize: {
      type: Number,
      default: 20,
      required: true
    },
    fixed: {
      type: Boolean,
      default: false
    },
    buffer: {
      type: Number,
      default: 0
    },
    bufferTop: {
      type: Number,
      default: 0
    },
    bufferBottom: {
      type: Number,
      default: 0
    },
    scrollDistance: {
      type: Number,
      default: 0
    },
    horizontal: {
      type: Boolean,
      default: false
    },
    start: {
      type: Number,
      default: 0
    },
    offset: {
      type: Number,
      default: 0
    },
    listStyle: {
      type: String,
      default: ""
    },
    listClass: {
      type: String,
      default: ""
    },
    itemStyle: {
      type: String,
      default: ""
    },
    itemClass: {
      type: String,
      default: ""
    },
    headerClass: {
      type: String,
      default: ""
    },
    headerStyle: {
      type: String,
      default: ""
    },
    footerClass: {
      type: String,
      default: ""
    },
    footerStyle: {
      type: String,
      default: ""
    },
    stickyHeaderClass: {
      type: String,
      default: ""
    },
    stickyHeaderStyle: {
      type: String,
      default: ""
    },
    stickyFooterClass: {
      type: String,
      default: ""
    },
    stickyFooterStyle: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
    const clientRef = ref(null);
    const listRefEl = ref(null);
    const sizesMap = /* @__PURE__ */ new Map();
    const renderKey = ref(new Date().getTime());
    let direction = "backward";
    let fixOffset = false;
    let forceFixOffset = false;
    const slotSize = {
      clientSize: 0,
      headerSize: 0,
      footerSize: 0,
      stickyHeaderSize: 0,
      stickyFooterSize: 0
    };
    const reactiveData = reactive({
      views: 0,
      offset: 0,
      listTotalSize: 0,
      virtualSize: 0,
      inViewBegin: 0,
      inViewEnd: 0,
      renderBegin: 0,
      renderEnd: 0,
      bufferTop: 0,
      bufferBottom: 0
    });
    function getOffset() {
      var _a;
      const directionKey = props.horizontal ? "scrollLeft" : "scrollTop";
      return ((_a = clientRef.value) == null ? void 0 : _a.$el) ? clientRef.value.$el[directionKey] : 0;
    }
    function getSlotSize() {
      return slotSize.headerSize + slotSize.footerSize + slotSize.stickyHeaderSize + slotSize.stickyFooterSize;
    }
    function getTotalSize() {
      return reactiveData.listTotalSize + slotSize.headerSize + slotSize.footerSize + slotSize.stickyHeaderSize + slotSize.stickyFooterSize;
    }
    function getItemSize(itemKey) {
      var _a;
      if (props.fixed)
        return props.minSize;
      return (_a = sizesMap.get(String(itemKey))) != null ? _a : props.minSize;
    }
    function setItemSize(itemKey, size) {
      sizesMap.set(String(itemKey), size);
    }
    function deleteItemSize(itemKey) {
      sizesMap.delete(String(itemKey));
    }
    function getItemPosByIndex(index) {
      var _a, _b;
      if (props.fixed) {
        return {
          top: props.minSize * index,
          current: props.minSize,
          bottom: props.minSize * (index + 1)
        };
      }
      const {
        itemKey
      } = props;
      let topReduce = slotSize.headerSize;
      for (let i = 0; i <= index - 1; i += 1) {
        const currentSize = getItemSize((_a = props.list[i]) == null ? void 0 : _a[itemKey]);
        topReduce += currentSize;
      }
      const current = getItemSize((_b = props.list[index]) == null ? void 0 : _b[itemKey]);
      return {
        top: topReduce,
        current,
        bottom: topReduce + current
      };
    }
    function scrollToOffset(offset, needForceFixOffset = false) {
      var _a;
      if (needForceFixOffset) {
        forceFixOffset = true;
      }
      const directionKey = props.horizontal ? "scrollLeft" : "scrollTop";
      if ((_a = clientRef.value) == null ? void 0 : _a.$el)
        clientRef.value.$el[directionKey] = offset;
    }
    async function scrollToIndex(index) {
      console.log("scrollToIndex", index);
      if (index < 0) {
        return;
      }
      if (index >= props.list.length - 1) {
        scrollToBottom();
        return;
      }
      let {
        top: lastOffset
      } = getItemPosByIndex(index);
      const recursion = async () => {
        scrollToOffset(lastOffset);
        setTimeout(() => {
          const {
            top: offset
          } = getItemPosByIndex(index);
          if (lastOffset !== offset) {
            lastOffset = offset;
            recursion();
          }
        }, 3);
      };
      recursion();
    }
    async function scrollIntoView(index) {
      var _a;
      const {
        top: targetMin,
        bottom: targetMax
      } = getItemPosByIndex(index);
      const offsetMin = getOffset();
      const offsetMax = getOffset() + slotSize.clientSize;
      const currentSize = getItemSize((_a = props.list[index]) == null ? void 0 : _a[props.itemKey]);
      if (targetMin < offsetMin && offsetMin < targetMax && currentSize < slotSize.clientSize) {
        scrollToOffset(targetMin);
        return;
      }
      if (targetMin + slotSize.stickyHeaderSize < offsetMax && offsetMax < targetMax + slotSize.stickyHeaderSize && currentSize < slotSize.clientSize) {
        scrollToOffset(targetMax - slotSize.clientSize + slotSize.stickyHeaderSize);
        return;
      }
      if (targetMin + slotSize.stickyHeaderSize >= offsetMax) {
        scrollToIndex(index);
        return;
      }
      if (targetMax <= offsetMin) {
        scrollToIndex(index);
        return;
      }
    }
    async function scrollToTop() {
      scrollToOffset(0);
      setTimeout(() => {
        const directionKey = props.horizontal ? "scrollLeft" : "scrollTop";
        if (clientRef.value && clientRef.value.$el[directionKey] !== 0) {
          scrollToTop();
        }
      }, 3);
    }
    async function scrollToBottom() {
      scrollToOffset(getTotalSize());
      setTimeout(() => {
        if (Math.abs(Math.round(reactiveData.offset + slotSize.clientSize) - Math.round(getTotalSize())) > 2) {
          scrollToBottom();
        }
      }, 0);
    }
    function fixSelection() {
      const selection = window.getSelection();
      if (selection) {
        const {
          anchorNode,
          anchorOffset,
          focusNode,
          focusOffset
        } = selection;
        if (anchorNode && anchorOffset !== null && focusNode !== null && focusOffset && anchorNode !== focusNode) {
          requestAnimationFrame(() => {
            if (anchorOffset < focusOffset) {
              selection.setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
            } else {
              selection.setBaseAndExtent(focusNode, focusOffset, anchorNode, anchorOffset);
            }
          });
        }
      }
    }
    function updateRange(start) {
      if (direction === "backward") {
        fixSelection();
      }
      reactiveData.inViewBegin = start;
      reactiveData.inViewEnd = Math.min(start + reactiveData.views, props.list.length);
    }
    function calcRange() {
      var _a, _b;
      const {
        views,
        offset,
        inViewBegin
      } = reactiveData;
      const {
        itemKey
      } = props;
      const offsetWithNoHeader = offset - slotSize.headerSize;
      let start = inViewBegin;
      let offsetReduce = getVirtualSize2beginInView();
      if (offsetWithNoHeader < 0) {
        updateRange(0);
        return;
      }
      if (direction === "forward") {
        if (offsetWithNoHeader >= offsetReduce) {
          return;
        }
        for (let i = start - 1; i >= 0; i -= 1) {
          const currentSize = getItemSize((_a = props.list[i]) == null ? void 0 : _a[itemKey]);
          offsetReduce -= currentSize;
          if (offsetReduce <= offsetWithNoHeader && offsetWithNoHeader < offsetReduce + currentSize) {
            start = i;
            break;
          }
        }
        fixOffset = true;
      }
      if (direction === "backward") {
        if (offsetWithNoHeader <= offsetReduce) {
          return;
        }
        for (let i = start; i <= props.list.length - 1; i += 1) {
          const currentSize = getItemSize((_b = props.list[i]) == null ? void 0 : _b[itemKey]);
          if (offsetReduce <= offsetWithNoHeader && offsetWithNoHeader < offsetReduce + currentSize) {
            start = i;
            break;
          }
          offsetReduce += currentSize;
        }
        fixOffset = false;
      }
      if (start !== reactiveData.inViewBegin) {
        updateRange(start);
      }
    }
    function onScroll(evt) {
      context.emit("scroll", evt);
      const offset = getOffset();
      if (offset === reactiveData.offset)
        return;
      direction = offset < reactiveData.offset ? "forward" : "backward";
      reactiveData.offset = offset;
      calcRange();
      if (direction === "forward" && reactiveData.offset - props.scrollDistance <= 0) {
        console.log("[VirtualList] \u5230\u8FBE\u9876\u90E8");
        context.emit("toTop", props.list[0]);
      }
      if (direction === "backward" && reactiveData.offset + props.scrollDistance >= reactiveData.listTotalSize + getSlotSize() - slotSize.clientSize) {
        console.log("[VirtualList] \u5230\u8FBE\u5E95\u90E8");
        context.emit("toBottom", props.list[props.list.length - 1]);
      }
    }
    function calcViews() {
      const newViews = Math.ceil(slotSize.clientSize / props.minSize) + 1;
      reactiveData.views = newViews;
    }
    function onClientResize() {
      calcViews();
      updateRange(reactiveData.inViewBegin);
    }
    function calcListTotalSize() {
      var _a;
      if (props.fixed) {
        reactiveData.listTotalSize = props.minSize * props.list.length;
        return;
      }
      const {
        itemKey
      } = props;
      let re = 0;
      for (let i = 0; i <= props.list.length - 1; i += 1) {
        re += getItemSize((_a = props.list[i]) == null ? void 0 : _a[itemKey]);
      }
      reactiveData.listTotalSize = re;
    }
    function reset() {
      console.log("[VirtualList] reset");
      reactiveData.offset = 0;
      reactiveData.listTotalSize = 0;
      reactiveData.virtualSize = 0;
      reactiveData.inViewBegin = 0;
      reactiveData.inViewEnd = 0;
      reactiveData.renderBegin = 0;
      reactiveData.renderEnd = 0;
      sizesMap.clear();
    }
    function decreaseTopSize(prevList) {
      calcListTotalSize();
      let prevListSize = 0;
      prevList.forEach((item) => {
        prevListSize += getItemSize(item[props.itemKey]);
      });
      reactiveData.inViewBegin -= prevList.length;
      reactiveData.virtualSize -= prevListSize;
      scrollToOffset(reactiveData.offset - prevListSize);
      calcRange();
    }
    function increaseTopSize(prevList) {
      calcListTotalSize();
      let prevListSize = 0;
      prevList.forEach((item) => {
        prevListSize += getItemSize(item[props.itemKey]);
      });
      reactiveData.inViewBegin += prevList.length;
      reactiveData.virtualSize += prevListSize;
      scrollToOffset(reactiveData.offset + prevListSize);
      calcRange();
    }
    function forceUpdate() {
      renderKey.value = new Date().getTime();
    }
    let resizeObserver = void 0;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver((entries) => {
        let diff = 0;
        for (const entry of entries) {
          const id = entry.target.dataset.id;
          if (id) {
            const oldSize = getItemSize(id);
            const newSize = props.horizontal ? entry.borderBoxSize[0].inlineSize : entry.borderBoxSize[0].blockSize;
            if (id === "client") {
              slotSize.clientSize = newSize;
              onClientResize();
            } else if (id === "header") {
              slotSize.headerSize = newSize;
            } else if (id === "footer") {
              slotSize.footerSize = newSize;
            } else if (id === "stickyHeader") {
              slotSize.stickyHeaderSize = newSize;
            } else if (id === "stickyFooter") {
              slotSize.stickyFooterSize = newSize;
            } else if (oldSize !== newSize) {
              setItemSize(id, newSize);
              diff += newSize - oldSize;
              context.emit("itemResize", id, newSize);
            }
          }
        }
        reactiveData.listTotalSize += diff;
        if ((fixOffset || forceFixOffset) && diff !== 0) {
          fixOffset = false;
          forceFixOffset = false;
          scrollToOffset(reactiveData.offset + diff);
        }
      });
    }
    onBeforeMount(() => {
      if (props.bufferTop) {
        reactiveData.bufferTop = props.bufferTop;
      } else {
        reactiveData.bufferTop = props.buffer;
      }
      if (props.bufferBottom) {
        reactiveData.bufferBottom = props.bufferBottom;
      } else {
        reactiveData.bufferBottom = props.buffer;
      }
    });
    onMounted(() => {
      if (clientRef.value) {
        clientRef.value.$el.addEventListener("scroll", onScroll);
      }
      if (props.start) {
        scrollToIndex(props.start);
      } else if (props.offset) {
        scrollToOffset(props.offset);
      }
    });
    onBeforeUnmount(() => {
      if (clientRef.value) {
        clientRef.value.$el.removeEventListener("scroll", onScroll);
      }
    });
    function getVirtualSize2beginInView() {
      return reactiveData.virtualSize + getRangeSize(reactiveData.renderBegin, reactiveData.inViewBegin);
    }
    function getRangeSize(range1, range2) {
      var _a;
      const start = Math.min(range1, range2);
      const end = Math.max(range1, range2);
      let re = 0;
      for (let i = start; i < end; i += 1) {
        re += getItemSize((_a = props.list[i]) == null ? void 0 : _a[props.itemKey]);
      }
      return re;
    }
    const filterList = shallowRef([]);
    watch(
      () => [reactiveData.inViewBegin, reactiveData.inViewEnd, renderKey.value],
      (newVal, oldVal) => {
        if (newVal && oldVal) {
          const [_newInViewBegin] = newVal;
          const [_oldInViewBegin] = oldVal;
          const _oldRenderBegin = Math.max(0, _oldInViewBegin - reactiveData.bufferTop);
          const _newRenderBegin = Math.max(0, _newInViewBegin - reactiveData.bufferTop);
          const _newRenderEnd = Math.min(reactiveData.inViewEnd + reactiveData.bufferBottom, props.list.length);
          if (_newRenderBegin > _oldRenderBegin) {
            reactiveData.virtualSize += getRangeSize(_newRenderBegin, _oldRenderBegin);
          } else {
            reactiveData.virtualSize -= getRangeSize(_newRenderBegin, _oldRenderBegin);
          }
          reactiveData.renderBegin = _newRenderBegin;
          reactiveData.renderEnd = _newRenderEnd;
          filterList.value = props.list.slice(reactiveData.renderBegin, reactiveData.renderEnd);
        }
      },
      {
        immediate: true
      }
    );
    watch(() => props.list.length, () => {
      if (props.list.length <= 0) {
        reset();
        return;
      }
      calcListTotalSize();
      updateRange(reactiveData.inViewBegin);
      forceUpdate();
    }, {
      immediate: true
    });
    return {
      props,
      filterList,
      clientRef,
      listRefEl,
      reactiveData,
      getOffset,
      reset,
      scrollToIndex,
      scrollIntoView,
      scrollToTop,
      scrollToBottom,
      scrollToOffset,
      getItemSize,
      deleteItemSize,
      decreaseTopSize,
      increaseTopSize,
      getItemPosByIndex,
      forceUpdate,
      resizeObserver,
      sizesMap,
      slotSize
    };
  },
  render() {
    const {
      filterList,
      itemKey,
      reactiveData,
      resizeObserver
    } = this;
    const {
      horizontal,
      listStyle,
      listClass,
      itemStyle,
      itemClass,
      headerClass,
      headerStyle,
      footerClass,
      footerStyle,
      stickyHeaderClass,
      stickyHeaderStyle,
      stickyFooterClass,
      stickyFooterStyle
    } = this.props;
    const renderStickyHeaderSlot = () => {
      return this.$slots.stickyHeader ? h(ObserverItem, polyfillAttr({
        key: "slot-sticky-header",
        class: stickyHeaderClass,
        style: `position: sticky; z-index: 10; ${horizontal ? "left: 0" : "top: 0;"} ${stickyHeaderStyle}`
      }, {
        id: "stickyHeader",
        resizeObserver,
        unmount: () => {
          this.slotSize.stickyHeaderSize = 0;
        }
      }), [polyfillSlot(this.$slots.stickyHeader)]) : null;
    };
    const renderStickyFooterSlot = () => {
      return this.$slots.stickyFooter ? h(ObserverItem, polyfillAttr({
        key: "slot-sticky-footer",
        class: stickyFooterClass,
        style: `position: sticky; z-index: 10; ${horizontal ? "right: 0" : "bottom: 0;"} ${stickyFooterStyle}`
      }, {
        id: "stickyFooter",
        resizeObserver,
        unmount: () => {
          this.slotSize.stickyFooterSize = 0;
        }
      }), [polyfillSlot(this.$slots.stickyFooter)]) : null;
    };
    const renderHeaderSlot = () => {
      return this.$slots.header ? h(ObserverItem, polyfillAttr({
        key: "slot-header",
        class: headerClass,
        style: headerStyle
      }, {
        id: "header",
        resizeObserver,
        unmount: () => {
          this.slotSize.headerSize = 0;
        }
      }), [polyfillSlot(this.$slots.header)]) : null;
    };
    const renderFooterSlot = () => {
      return this.$slots.footer ? h(ObserverItem, polyfillAttr({
        key: "slot-footer",
        class: footerClass,
        style: footerStyle
      }, {
        id: "footer",
        resizeObserver,
        unmount: () => {
          this.slotSize.footerSize = 0;
        }
      }), [polyfillSlot(this.$slots.footer)]) : null;
    };
    const {
      listTotalSize,
      virtualSize
    } = reactiveData;
    const renderMainList = () => {
      var _a, _b, _c, _d;
      const mainList = [];
      for (let index = 0; index < filterList.length; index += 1) {
        const currentItem = filterList[index];
        mainList.push(h(ObserverItem, polyfillAttr({
          key: currentItem[itemKey],
          class: itemClass,
          style: itemStyle
        }, {
          id: currentItem[itemKey],
          resizeObserver
        }), polyfillChildren([isVue2 ? (_b = (_a = this.$scopedSlots) == null ? void 0 : _a.default) == null ? void 0 : _b.call(_a, {
          itemData: currentItem
        }) : (_d = (_c = this.$slots).default) == null ? void 0 : _d.call(_c, {
          itemData: currentItem
        })])));
      }
      const dynamicListStyle = horizontal ? `will-change: width; min-width: ${listTotalSize}px; display: flex; ${listStyle}` : `will-change: height; min-height: ${listTotalSize}px; ${listStyle}`;
      return h("div", {
        ref: "listRefEl",
        class: listClass,
        style: dynamicListStyle
      }, [h("div", {
        style: horizontal ? `width: ${virtualSize}px; will-change: width;` : `height: ${virtualSize}px; will-change: height;`
      }), mainList]);
    };
    return h(ObserverItem, polyfillAttr({
      class: "virtual-list__client",
      style: `width: 100%; height: 100%; overflow: overlay;`,
      ref: "clientRef"
    }, {
      id: "client",
      resizeObserver,
      unmount: () => {
        this.slotSize.clientSize = 0;
      }
    }), polyfillChildren([renderStickyHeaderSlot(), renderHeaderSlot(), renderMainList(), renderFooterSlot(), renderStickyFooterSlot()]));
  }
});
export {
  VirtualList
};
//# sourceMappingURL=index.js.map
