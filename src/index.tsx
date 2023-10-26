/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  reactive,
  ref,
  shallowRef,
  watch,
  nextTick,
  type ShallowRef,
} from 'vue-demi';

const ObserverItem = defineComponent({
  name: 'ObserverItem',
  props: {
    resizeObserver: {
      type: ResizeObserver,
      require: true,
    },
    id: {
      type: [String, Number],
      require: true,
    },
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
    });

    return {
      itemRefEl,
    };
  },
  render() {
    const { id } = this;
    return (
      <div ref="itemRefEl" data-id={id}>
        {this.$slots.default}
      </div>
    );
  },
});

const VirtualList = defineComponent({
  name: 'VirtualList',
  props: {
    list: {
      type: Array<any>,
      default: () => [],
    },
    // 数据key
    itemKey: {
      type: [String, Number],
      required: true,
    },
    // 最小尺寸
    minSize: {
      type: Number,
      default: 20,
      required: true,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    buffer: {
      type: Number,
      default: 0,
    },
    bufferTop: {
      type: Number,
      default: 0,
    },
    bufferBottom: {
      type: Number,
      default: 0,
    },
    // 滚动距离阈值
    scrollDistance: {
      type: Number,
      default: 0,
    },
    // 是否为水平移动
    horizontal: {
      type: Boolean,
      default: false,
    },
    // 起始下标
    start: {
      type: Number,
      default: 0,
    },
    // 起始偏移量
    offset: {
      type: Number,
      default: 0,
    },
    listStyle: {
      type: String,
      default: '',
    },
    headerClass: {
      type: String,
      default: '',
    },
    headerStyle: {
      type: String,
      default: '',
    },
    footerClass: {
      type: String,
      default: '',
    },
    footerStyle: {
      type: String,
      default: '',
    },
    stickyHeaderClass: {
      type: String,
      default: '',
    },
    stickyHeaderStyle: {
      type: String,
      default: '',
    },
    stickyFooterClass: {
      type: String,
      default: '',
    },
    stickyFooterStyle: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const clientRef = ref<typeof ObserverItem | null>(null);
    const listRefEl = ref<HTMLElement | null>(null);
    const sizesMap = new Map();
    const renderKey = ref(new Date().getTime());
    let direction: 'forward' | 'backward' = 'backward';
    // 一个手动设置滚动的标志位，用来判断是否需要纠正滚动位置
    let setScrollFlag = false;
    const slotSize = {
      clientSize: 0,
      headerSize: 0,
      footerSize: 0,
      stickyHeaderSize: 0,
      stickyFooterSize: 0,
    };

    // 全局需要响应式的数据
    const reactiveData = reactive({
      // 可视区域的个数，不算buffer，只和clientSize和minSize有关
      views: 0,

      // 滚动距离
      offset: 0,
      // 不包含插槽的高度
      listTotalSize: 0,
      // 虚拟占位尺寸，是从0到renderBegin的尺寸
      virtualSize: 0,
      // 可视区的起始下标
      inViewBegin: 0,
      // 可视区的结束下标
      inViewEnd: 0,

      // buffer的起始下标
      renderBegin: 0,
      // buffer的结束下标
      renderEnd: 0,

      bufferTop: 0,
      bufferBottom: 0,
    });

    function getOffset() {
      const directionKey = props.horizontal ? 'scrollLeft' : 'scrollTop';
      return clientRef.value?.$el ? clientRef.value.$el[directionKey] : 0;
    }
    function getSlotSize() {
      return (
        slotSize.headerSize +
        slotSize.footerSize +
        slotSize.stickyHeaderSize +
        slotSize.stickyFooterSize
      );
    }
    function getItemSize(itemKey: string) {
      if (props.fixed) return props.minSize;
      return sizesMap.get(String(itemKey)) ?? props.minSize;
    }
    function setItemSize(itemKey: string, size: number) {
      sizesMap.set(String(itemKey), size);
    }
    function deleteItemSize(itemKey: string) {
      sizesMap.delete(String(itemKey));
    }
    // 通过下标来获取元素位置信息
    function getItemPosByIndex(index: number) {
      if (props.fixed) {
        return {
          top: props.minSize * index,
          current: props.minSize,
          bottom: props.minSize * (index + 1),
        };
      }

      const { itemKey } = props;
      let topReduce = slotSize.headerSize;
      for (let i = 0; i <= index - 1; i += 1) {
        const currentSize = getItemSize(props.list[i]?.[itemKey]);
        topReduce += currentSize;
      }
      const current = getItemSize(props.list[index]?.[itemKey]);
      return {
        top: topReduce,
        current,
        bottom: topReduce + current,
      };
    }

    function scrollToOffset(offset: number) {
      // console.log('scrollToOffset', offset);
      setScrollFlag = true;
      const directionKey = props.horizontal ? 'scrollLeft' : 'scrollTop';
      if (clientRef.value?.$el) clientRef.value.$el[directionKey] = offset;

      nextTick(() => {
        setScrollFlag = false;
      });
    }
    // expose 滚动到指定下标
    async function scrollToIndex(index: number) {
      console.log('scrollToIndex', index);

      if (index < 0) {
        return;
      }

      // 如果要去的位置大于长度，那么就直接调用去底部的方法
      if (index >= props.list.length - 1) {
        scrollToBottom();
        return;
      }

      let { top: lastOffset } = getItemPosByIndex(index);
      const recursion = async () => {
        scrollToOffset(lastOffset);

        setTimeout(() => {
          // 第二次看一下有没有需要修正的情况
          const { top: offset } = getItemPosByIndex(index);
          // 查看位置是否有修正，有修正就递归自己
          if (lastOffset !== offset) {
            lastOffset = offset;
            recursion();
          }
        }, 3);
      };
      recursion();
    }
    // expose 滚动到可视区域
    async function scrollIntoView(index: number) {
      const { top: targetMin, bottom: targetMax } = getItemPosByIndex(index);
      const offsetMin = getOffset();
      const offsetMax = getOffset() + slotSize.clientSize;
      const currentSize = getItemSize(props.list[index]?.[props.itemKey]);
      if (
        targetMin < offsetMin &&
        offsetMin < targetMax &&
        currentSize < slotSize.clientSize
      ) {
        // 如果目标元素上方看不到，底部看得到，那么滚动到顶部部看得到就行了
        scrollToOffset(targetMin);
        return;
      }
      if (
        targetMin + slotSize.stickyHeaderSize < offsetMax &&
        offsetMax < targetMax + slotSize.stickyHeaderSize &&
        currentSize < slotSize.clientSize
      ) {
        // 如果目标元素上方看得到，底部看不到，那么滚动到底部看得到就行了
        scrollToOffset(
          targetMax - slotSize.clientSize + slotSize.stickyHeaderSize,
        );
        return;
      }

      // 屏幕下方
      if (targetMin + slotSize.stickyHeaderSize >= offsetMax) {
        scrollToIndex(index);
        return;
      }

      // 屏幕上方
      if (targetMax <= offsetMin) {
        scrollToIndex(index);
        return;
      }

      // 在中间就不动了
    }
    // expose 滚动到顶部，这个和去第一个元素不同
    async function scrollToTop() {
      scrollToOffset(0);
    }
    // expose 滚动到底部
    async function scrollToBottom() {
      const lastListTotalSize =
        reactiveData.listTotalSize + slotSize.headerSize + slotSize.footerSize;
      scrollToOffset(lastListTotalSize);

      setTimeout(() => {
        const currentSize =
          reactiveData.listTotalSize +
          slotSize.headerSize +
          slotSize.footerSize;
        if (lastListTotalSize < currentSize) {
          scrollToBottom();
        }
      }, 0);
    }

    // 修复vue2-diff的bug导致的selection问题
    function fixSelection() {
      const selection = window.getSelection();
      if (selection) {
        const { anchorNode, anchorOffset, focusNode, focusOffset } = selection;
        // console.log(
        //   '发生变更',
        //   selection,
        //   anchorNode,
        //   anchorOffset,
        //   focusNode,
        //   focusOffset,
        // );
        if (
          anchorNode &&
          anchorOffset !== null &&
          focusNode !== null &&
          focusOffset
        ) {
          requestAnimationFrame(() => {
            if (anchorOffset < focusOffset) {
              selection.setBaseAndExtent(
                anchorNode,
                anchorOffset,
                focusNode,
                focusOffset,
              );
            } else {
              selection.setBaseAndExtent(
                focusNode,
                focusOffset,
                anchorNode,
                anchorOffset,
              );
            }
          });
        }
      }
    }

    function updateRange(start: number) {
      // 修复vue2-diff的bug
      if (reactiveData.inViewBegin < start) {
        fixSelection();
      }

      reactiveData.inViewBegin = start;
      reactiveData.inViewEnd = Math.min(
        start + reactiveData.views,
        props.list.length,
      );
    }

    function calcRange() {
      const { views, offset, inViewBegin } = reactiveData;
      const { itemKey } = props;

      const offsetWithNoHeader = offset - slotSize.headerSize;
      // 如果滚动距离还在header范围内，是不需要计算的
      if (offsetWithNoHeader < 0) {
        updateRange(0);
        return;
      }

      // 进入计算
      let start = inViewBegin;
      let offsetReduce = getVirtualSize2beginInView();
      if (direction === 'forward') {
        for (let i = start - 1; i >= 0; i -= 1) {
          // 1. 没发生变化
          if (i === start - 1 && offsetWithNoHeader >= offsetReduce) {
            start = i + 1;
            // console.log(`👆🏻👆🏻👆🏻👆🏻 for break 没变 start ${start}`);
            break;
          }
          // 2. 变化了
          const currentSize = getItemSize(props.list[i]?.[itemKey]);
          offsetReduce -= currentSize;
          // 要计算2个header插槽的高度
          if (
            offsetReduce <= offsetWithNoHeader &&
            offsetWithNoHeader < offsetReduce + currentSize
          ) {
            start = i;
            // console.log(`👆🏻👆🏻👆🏻👆🏻 for break 变了 start ${start}`);
            break;
          }
        }
      } else {
        for (let i = start; i <= props.list.length - 1; i += 1) {
          // 1. 到底了
          if (i >= props.list.length - views) {
            start = i;
            break;
          }
          // 2. 变化了
          const currentSize = getItemSize(props.list[i]?.[itemKey]);
          if (
            offsetReduce <= offsetWithNoHeader &&
            offsetWithNoHeader < offsetReduce + currentSize
          ) {
            start = i;
            break;
          }
          offsetReduce += currentSize;
        }
      }

      // 节流
      if (start === 0 || start !== reactiveData.inViewBegin) {
        updateRange(start);
      }
    }

    function onScroll(evt: Event) {
      context.emit('scroll', evt);

      const offset = getOffset();
      // console.log('onscroll', offset, reactiveData.offset);

      if (offset === reactiveData.offset) return;
      direction = offset < reactiveData.offset ? 'forward' : 'backward';
      reactiveData.offset = offset;

      calcRange();

      // 到达顶部
      if (
        direction === 'forward' &&
        reactiveData.offset - props.scrollDistance <= 0
      ) {
        console.log('[VirtualList] 到达顶部');
        context.emit('toTop', props.list[0]);
      }
      // 到达底部 - 放在这里是为了渲染完成拿到真是高度了，再判断是否是真的到达底部
      if (
        direction === 'backward' &&
        reactiveData.offset + props.scrollDistance >=
          reactiveData.listTotalSize + getSlotSize() - slotSize.clientSize
      ) {
        console.log('[VirtualList] 到达底部');
        context.emit('toBottom', props.list[props.list.length - 1]);
      }
    }

    function calcViews() {
      // 不算buffer的个数
      const newViews = Math.ceil(slotSize.clientSize / props.minSize) + 1;
      reactiveData.views = newViews;
    }

    function onClientResize() {
      // 可视区域尺寸变化 => 1. 更新可视区域个数 2. 可视区域个数变化后需要及时更新记录尺寸
      calcViews();
      updateRange(reactiveData.inViewBegin);
    }

    function calcListTotalSize() {
      if (props.fixed) {
        reactiveData.listTotalSize = props.minSize * props.list.length;
        return;
      }
      const { itemKey } = props;
      let re = 0;
      for (let i = 0; i <= props.list.length - 1; i += 1) {
        re += getItemSize(props.list[i]?.[itemKey]);
      }
      reactiveData.listTotalSize = re;
    }

    function reset() {
      console.log('[VirtualList] reset');

      reactiveData.offset = 0;
      reactiveData.listTotalSize = 0;
      reactiveData.virtualSize = 0;

      reactiveData.inViewBegin = 0;
      reactiveData.inViewEnd = 0;

      reactiveData.renderBegin = 0;
      reactiveData.renderEnd = 0;

      // fix bug: 滚动到顶部后，修改list会导致不应出现的修正误差操作
      direction = 'backward';

      sizesMap.clear();
    }
    // expose only
    function decreaseTopSize(prevList: []) {
      calcListTotalSize();
      let prevListSize = 0;
      prevList.forEach((item) => {
        // console.log(item[props.itemKey], getItemSize(item[props.itemKey]));
        prevListSize += getItemSize(item[props.itemKey]);
      });
      reactiveData.inViewBegin -= prevList.length;
      reactiveData.virtualSize -= prevListSize;
      scrollToOffset(reactiveData.offset - prevListSize);

      calcRange();
    }
    // expose only
    function increaseTopSize(prevList: []) {
      calcListTotalSize();

      let prevListSize = 0;
      prevList.forEach((item) => {
        // console.log(item[props.itemKey], getItemSize(item[props.itemKey]));
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

    let resizeObserver: ResizeObserver | undefined = undefined;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver((entries) => {
        // FIXME 这里加了requestIdleCallback会有问题，暂时不知道为什么
        // 延迟执行，快速滚动的时候是没有必要的
        // requestIdleCallback(() => {
        let diff = 0;
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.id;

          if (id) {
            const oldSize = getItemSize(id);
            const newSize = props.horizontal
              ? entry.contentBoxSize[0].inlineSize
              : entry.contentBoxSize[0].blockSize;

            if (id === 'client') {
              slotSize.clientSize = newSize;
              onClientResize();
            } else if (id === 'header') {
              slotSize.headerSize = newSize;
            } else if (id === 'footer') {
              slotSize.footerSize = newSize;
            } else if (id === 'stickyHeader') {
              slotSize.stickyHeaderSize = newSize;
            } else if (id === 'stickyFooter') {
              slotSize.stickyFooterSize = newSize;
            } else if (oldSize !== newSize) {
              setItemSize(id, newSize);
              diff += newSize - oldSize;
            }
          }
        }
        reactiveData.listTotalSize += diff;
        // 向上滚动纠正误差
        if (!setScrollFlag && direction === 'forward' && diff !== 0) {
          scrollToOffset(reactiveData.offset + diff);
        }
      });
      // });
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
        clientRef.value.$el.addEventListener('scroll', onScroll);
      }

      if (props.start) {
        scrollToIndex(props.start);
      } else if (props.offset) {
        scrollToOffset(props.offset);
      }
    });

    onBeforeUnmount(() => {
      if (clientRef.value) {
        clientRef.value.$el.removeEventListener('scroll', onScroll);
      }
    });

    function getVirtualSize2beginInView() {
      return (
        reactiveData.virtualSize +
        getRangeSize(reactiveData.renderBegin, reactiveData.inViewBegin)
      );
    }

    function getRangeSize(range1: number, range2: number) {
      const start = Math.min(range1, range2);
      const end = Math.max(range1, range2);
      let re = 0;
      for (let i = start; i < end; i += 1) {
        re += getItemSize(props.list[i]?.[props.itemKey]);
      }
      return re;
    }

    const filterList: ShallowRef<any[]> = shallowRef([]);
    watch(
      // 这里为什么用 renderKey 代替监听 props.list
      // 因为props.list会导致v-for时deepArray导致大量的性能浪费
      () => [reactiveData.inViewBegin, reactiveData.inViewEnd, renderKey.value],
      (newVal, oldVal) => {
        if (newVal && oldVal) {
          // console.log('watch', newVal, oldVal);
          const [_newInViewBegin] = newVal;
          const [_oldInViewBegin] = oldVal;

          const _oldRenderBegin = Math.max(
            0,
            _oldInViewBegin - reactiveData.bufferTop,
          );

          const _newRenderBegin = Math.max(
            0,
            _newInViewBegin - reactiveData.bufferTop,
          );

          const _newRenderEnd = Math.min(
            reactiveData.inViewEnd + reactiveData.bufferBottom,
            props.list.length,
          );

          // update virtualSize, diff range size
          if (_newRenderBegin > _oldRenderBegin) {
            reactiveData.virtualSize += getRangeSize(
              _newRenderBegin,
              _oldRenderBegin,
            );
          } else {
            reactiveData.virtualSize -= getRangeSize(
              _newRenderBegin,
              _oldRenderBegin,
            );
          }

          reactiveData.renderBegin = _newRenderBegin;
          reactiveData.renderEnd = _newRenderEnd;

          // 实际渲染的时候要用buffer的
          filterList.value = props.list.slice(
            reactiveData.renderBegin,
            reactiveData.renderEnd,
          );
        }
      },
      {
        immediate: true,
      },
    );

    watch(
      () => props.list.length,
      () => {
        // 如果数据为空，那么就重置
        if (props.list.length <= 0) {
          reset();
          return;
        }

        // [require] 因为list长度变化，所以总高度有变化
        calcListTotalSize();
        // [require] 因为list长度变化，所以重新计算起始结束位置
        calcRange();
        // [require] 起始位置可能不变，但列表元素发生变化，所以强制渲染一次
        forceUpdate();
      },
      {
        immediate: true,
      },
    );

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
      // expose only
      decreaseTopSize,
      increaseTopSize,
      getItemPosByIndex,
      forceUpdate,
      resizeObserver,
      sizesMap,
      // test
      slotSize,
    };
  },
  render() {
    const {
      props,
      filterList,

      itemKey,
      reactiveData,

      resizeObserver,
    } = this;

    const {
      horizontal,
      listStyle,
      headerClass,
      headerStyle,
      footerClass,
      footerStyle,
      stickyHeaderClass,
      stickyHeaderStyle,
      stickyFooterClass,
      stickyFooterStyle,
    } = props;

    const { header, footer, stickyHeader, stickyFooter } = this.$slots;

    const renderStickyHeaderSlot = () => {
      return stickyHeader ? (
        <ObserverItem
          id="stickyHeader"
          resizeObserver={resizeObserver}
          key="slot-sticky-header"
          class={stickyHeaderClass}
          style={`position: sticky; z-index: 10; ${
            horizontal ? 'left: 0' : 'top: 0;'
          } ${stickyHeaderStyle}`}
        >
          {this.$slots.stickyHeader}
        </ObserverItem>
      ) : null;
    };

    const renderStickyFooterSlot = () => {
      return stickyFooter ? (
        <ObserverItem
          id="stickyFooter"
          resizeObserver={resizeObserver}
          key="slot-sticky-footer"
          class={stickyFooterClass}
          style={`position: sticky; z-index: 10; ${
            horizontal ? 'right: 0' : 'bottom: 0;'
          } ${stickyFooterStyle}`}
        >
          {this.$slots.stickyFooter}
        </ObserverItem>
      ) : null;
    };

    const renderHeaderSlot = () => {
      return header ? (
        <ObserverItem
          id="header"
          resizeObserver={resizeObserver}
          key="slot-header"
          class={headerClass}
          style={headerStyle}
        >
          {this.$slots.header}
        </ObserverItem>
      ) : null;
    };

    const renderFooterSlot = () => {
      return footer ? (
        <ObserverItem
          id="footer"
          resizeObserver={resizeObserver}
          key="slot-footer"
          class={footerClass}
          style={footerStyle}
        >
          {this.$slots.footer}
        </ObserverItem>
      ) : null;
    };

    const { listTotalSize, virtualSize } = reactiveData;

    const renderMainList = () => {
      const mainList = [];
      for (let index = 0; index < filterList.length; index += 1) {
        const currentItem = filterList[index];
        mainList.push(
          <ObserverItem
            id={currentItem[itemKey]}
            resizeObserver={resizeObserver}
            key={currentItem[itemKey]}
          >
            {this.$scopedSlots?.default?.({ itemData: currentItem })}
          </ObserverItem>,
        );
      }

      const dynamicListStyle = horizontal
        ? `will-change: width; min-width: ${listTotalSize}px; display: flex; ${listStyle}`
        : `will-change: height; min-height: ${listTotalSize}px; ${listStyle}`;

      return (
        <div ref="listRefEl" style={dynamicListStyle}>
          <div
            style={
              horizontal
                ? `width: ${virtualSize}px; will-change: width;`
                : `height: ${virtualSize}px; will-change: height;`
            }
          ></div>
          {mainList}
        </div>
      );
    };

    // const renderVirtualScrollbar = () => {
    //   return <div style={`float: left; height: ${listTotalSize}px`}></div>; // 虚拟滚动条
    // };

    return (
      <ObserverItem
        id="client"
        resizeObserver={resizeObserver}
        class="virtual-list__client"
        style={`width: 100%; height: 100%; overflow: overlay;`}
        ref="clientRef"
      >
        {[
          // renderVirtualScrollbar(),
          renderStickyHeaderSlot(),
          renderHeaderSlot(),
          renderMainList(),
          renderFooterSlot(),
          renderStickyFooterSlot(),
        ]}
      </ObserverItem>
    );
  },
});

export { VirtualList };
