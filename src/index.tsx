/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  isVue2,
  defineComponent,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  reactive,
  ref,
  shallowRef,
  watch,
  type Ref,
  type ShallowRef,
  type VNodeChildren,
  type VNode,
  type SetupContext,
} from 'vue-demi';
import { h } from 'vue';

function polyfillAttr(rest: Record<string, any>, attrs: Record<string, any>) {
  return isVue2
    ? {
        ...rest,
        attrs: attrs,
      }
    : {
        ...rest,
        ...attrs,
      };
}
type RawChildren =
  | VNodeChildren
  | {
      default: () => VNodeChildren;
    };

function polyfillChildren(children: any[]): RawChildren {
  return isVue2
    ? children
    : {
        default: () => children,
      };
}

function polyfillSlot(slot: any) {
  return isVue2 ? slot : slot?.();
}

type ObserverItemProps = {
  resizeObserver: ResizeObserver;
};
function useObserverItem(props: ObserverItemProps) {
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
}
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
    return useObserverItem(props as ObserverItemProps);
  },
  render() {
    const { id } = this;
    return h(
      'div',
      polyfillAttr(
        { ref: 'itemRefEl' },
        {
          'data-id': id,
        },
      ),
      [polyfillSlot(this.$slots.default)],
    );
  },
});

type ReactiveData = {
  views: number;

  // 滚动距离
  offset: number;
  // 不包含插槽的高度
  listTotalSize: number;
  // 虚拟占位尺寸，是从0到renderBegin的尺寸
  virtualSize: number;
  // 可视区的起始下标
  inViewBegin: number;
  // 可视区的结束下标
  inViewEnd: number;

  // buffer的起始下标
  renderBegin: number;
  // buffer的结束下标
  renderEnd: number;

  bufferTop: number;
  bufferBottom: number;
};

type VirtualListProps<T extends Record<string, string>> = {
  list: T[];
  itemKey: string | number;
  minSize: number;

  controlRender?: (
    begin: number,
    end: number,
  ) => { begin: number; end: number };

  fixed?: boolean;
  buffer?: number;
  bufferTop?: number;
  bufferBottom?: number;
  scrollDistance?: number;
  horizontal?: boolean;
  start?: number;
  offset?: number;
  listStyle?: string;
  listClass?: string;
  itemStyle?: string;
  itemClass?: string;
  headerClass?: string;
  headerStyle?: string;
  footerClass?: string;
  footerStyle?: string;
  stickyHeaderClass?: string;
  stickyHeaderStyle?: string;
  stickyFooterClass?: string;
  stickyFooterStyle?: string;
};

type EmitFunction<T> = {
  scroll?: (e: Event) => void;
  toTop?: (item: T) => void;
  toBottom?: (item: T) => void;
  itemResize?: (id: string, newSize: number) => void;
};

const defaultProps = {
  fixed: false,
  buffer: 0,
  bufferTop: 0,
  bufferBottom: 0,
  scrollDistance: 0,
  horizontal: false,
  start: 0,
  offset: 0,
  listStyle: '',
  listClass: '',
  itemStyle: '',
  itemClass: '',
  headerClass: '',
  headerStyle: '',
  footerClass: '',
  footerStyle: '',
  stickyHeaderClass: '',
  stickyHeaderStyle: '',
  stickyFooterClass: '',
  stickyFooterStyle: '',
};

type SlotSize = {
  clientSize: number;
  headerSize: number;
  footerSize: number;
  stickyHeaderSize: number;
  stickyFooterSize: number;
};

type VirtualListReturn<T extends Record<string, string>> = {
  props: Required<VirtualListProps<T>>;

  renderList: Ref<T[]>;
  clientRefEl: Ref<HTMLElement | null>;
  listRefEl: Ref<HTMLElement | null>;
  headerRefEl: Ref<HTMLElement | null>;
  footerRefEl: Ref<HTMLElement | null>;
  stickyHeaderRefEl: Ref<HTMLElement | null>;
  stickyFooterRefEl: Ref<HTMLElement | null>;

  reactiveData: ReactiveData;

  getOffset: () => number;
  reset: () => void;
  scrollToIndex: (index: number) => void;
  scrollIntoView: (index: number) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
  scrollToOffset: (offset: number) => void;
  getItemSize: (itemKey: string) => number;
  deleteItemSize: (itemKey: string) => void;
  // expose only
  decreaseTopSize: (preList: T[]) => void;
  increaseTopSize: (preList: T[]) => void;
  getItemPosByIndex: (index: number) => {
    top: number;
    current: number;
    bottom: number;
  };
  forceUpdate: () => void;
  resizeObserver: ResizeObserver | undefined;
  sizesMap: Map<string, number>;
  // test
  slotSize: SlotSize;
};

function useVirtualList<T extends Record<string, any>>(
  userProps: VirtualListProps<T>,
  emitFunction?: EmitFunction<T>,
): VirtualListReturn<T> {
  const props = new Proxy(userProps, {
    get(target, key) {
      return Reflect.get(target, key) ?? Reflect.get(defaultProps, key);
    },
  }) as Required<VirtualListProps<T>>;

  const clientRefEl = ref<HTMLElement | null>(null);
  const listRefEl = ref<HTMLElement | null>(null);
  const headerRefEl = ref<HTMLElement | null>(null);
  const footerRefEl = ref<HTMLElement | null>(null);
  const stickyHeaderRefEl = ref<HTMLElement | null>(null);
  const stickyFooterRefEl = ref<HTMLElement | null>(null);

  const sizesMap = new Map();
  const renderKey = ref(new Date().getTime());
  let direction: 'forward' | 'backward' = 'backward';
  // 一个手动设置滚动的标志位，用来判断是否需要纠正滚动位置
  let fixOffset = false;
  let forceFixOffset = false;
  const slotSize: SlotSize = {
    clientSize: 0,
    headerSize: 0,
    footerSize: 0,
    stickyHeaderSize: 0,
    stickyFooterSize: 0,
  };

  // 全局需要响应式的数据
  const reactiveData: ReactiveData = reactive({
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
    return clientRefEl.value ? clientRefEl.value[directionKey] : 0;
  }
  function getSlotSize() {
    return (
      slotSize.headerSize +
      slotSize.footerSize +
      slotSize.stickyHeaderSize +
      slotSize.stickyFooterSize
    );
  }
  function getTotalSize() {
    return (
      reactiveData.listTotalSize +
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

  function scrollToOffset(offset: number, needForceFixOffset = false) {
    if (needForceFixOffset) {
      forceFixOffset = true;
    }
    const directionKey = props.horizontal ? 'scrollLeft' : 'scrollTop';
    if (clientRefEl.value) clientRefEl.value[directionKey] = offset;
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

    setTimeout(() => {
      const directionKey = props.horizontal ? 'scrollLeft' : 'scrollTop';
      // 因为纠正滚动条会有误差，所以这里需要再次纠正
      if (clientRefEl?.value?.[directionKey] !== 0) {
        scrollToTop();
      }
    }, 3);
  }
  // expose 滚动到底部
  async function scrollToBottom() {
    scrollToOffset(getTotalSize());

    setTimeout(() => {
      // 修复底部误差，因为缩放屏幕的时候，获取的尺寸都是小数，精度会有问题，这里把误差调整为2px
      if (
        Math.abs(
          Math.round(reactiveData.offset + slotSize.clientSize) -
            Math.round(getTotalSize()),
        ) > 2
      ) {
        scrollToBottom();
      }
    }, 0);
  }

  // 修复vue2-diff的bug导致的selection问题
  function fixSelection() {
    const selection = window.getSelection();
    if (selection) {
      const { anchorNode, anchorOffset, focusNode, focusOffset } = selection;
      if (
        anchorNode &&
        anchorOffset !== null &&
        focusNode !== null &&
        focusOffset &&
        anchorNode !== focusNode
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
    if (direction === 'backward') {
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
    let start = inViewBegin;
    let offsetReduce = getVirtualSize2beginInView();

    // 当有顶部插槽的时候，快速滚动到顶部，则需要判断，并直接修正
    if (offsetWithNoHeader < 0) {
      updateRange(0);
      return;
    }

    if (direction === 'forward') {
      // 1. 没发生变化
      if (offsetWithNoHeader >= offsetReduce) {
        // console.log(`👆🏻👆🏻👆🏻👆🏻 for break 没变 start ${start}`);
        return;
      }
      for (let i = start - 1; i >= 0; i -= 1) {
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

      // 向上滚动需要修正
      fixOffset = true;
    }

    if (direction === 'backward') {
      if (offsetWithNoHeader <= offsetReduce) {
        // console.log(`👆🏻👆🏻👆🏻👆🏻 for break 没变 start ${start}`);
        return;
      }
      for (let i = start; i <= props.list.length - 1; i += 1) {
        // 2. 变化了
        const currentSize = getItemSize(props.list[i]?.[itemKey]);
        // console.log('currentSize', i, props.list[i]?.[itemKey], currentSize);

        if (
          offsetReduce <= offsetWithNoHeader &&
          offsetWithNoHeader < offsetReduce + currentSize
        ) {
          start = i;
          break;
        }
        offsetReduce += currentSize;
      }

      // 向下滚动不需要修正
      fixOffset = false;
    }

    // 节流
    if (start !== reactiveData.inViewBegin) {
      updateRange(start);
    }
  }

  function onScroll(evt: Event) {
    // console.log('onscroll');

    emitFunction?.scroll?.(evt);

    const offset = getOffset();

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
      emitFunction?.toTop?.(props.list[0]);
    }
    // 到达底部 - 放在这里是为了渲染完成拿到真是高度了，再判断是否是真的到达底部
    if (
      direction === 'backward' &&
      reactiveData.offset + props.scrollDistance >=
        reactiveData.listTotalSize + getSlotSize() - slotSize.clientSize
    ) {
      console.log('[VirtualList] 到达底部');
      emitFunction?.toBottom?.(props.list[props.list.length - 1]);
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
    sizesMap.clear();
  }
  // expose only
  function decreaseTopSize(prevList: T[]) {
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
  function increaseTopSize(prevList: T[]) {
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
            ? entry.borderBoxSize[0].inlineSize
            : entry.borderBoxSize[0].blockSize;

          // console.log(id, newSize);

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
            emitFunction?.itemResize?.(id, newSize);
          }
        }
      }
      reactiveData.listTotalSize += diff;
      // console.log(fixOffset, forceFixOffset, diff);
      // 向上滚动纠正误差 - 当没有顶部buffer的时候是需要的
      if ((fixOffset || forceFixOffset) && diff !== 0) {
        fixOffset = false;
        forceFixOffset = false;
        scrollToOffset(reactiveData.offset + diff);
        // console.log('纠正误差', reactiveData.offset, diff);
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
    if (clientRefEl.value) {
      clientRefEl.value.addEventListener('scroll', onScroll);

      resizeObserver?.observe(clientRefEl.value);
    }

    if (stickyHeaderRefEl.value) {
      resizeObserver?.observe(stickyHeaderRefEl.value);
    }
    if (stickyFooterRefEl.value) {
      resizeObserver?.observe(stickyFooterRefEl.value);
    }
    if (headerRefEl.value) {
      resizeObserver?.observe(headerRefEl.value);
    }
    if (footerRefEl.value) {
      resizeObserver?.observe(footerRefEl.value);
    }

    if (props.start) {
      scrollToIndex(props.start);
    } else if (props.offset) {
      scrollToOffset(props.offset);
    }
  });

  onBeforeUnmount(() => {
    if (clientRefEl.value) {
      clientRefEl.value.removeEventListener('scroll', onScroll);

      resizeObserver?.unobserve(clientRefEl.value);
      slotSize.clientSize = 0;
    }

    if (stickyHeaderRefEl.value) {
      resizeObserver?.unobserve(stickyHeaderRefEl.value);
      slotSize.stickyHeaderSize = 0;
    }
    if (stickyFooterRefEl.value) {
      resizeObserver?.unobserve(stickyFooterRefEl.value);
      slotSize.stickyFooterSize = 0;
    }
    if (headerRefEl.value) {
      resizeObserver?.unobserve(headerRefEl.value);
      slotSize.headerSize = 0;
    }
    if (footerRefEl.value) {
      resizeObserver?.unobserve(footerRefEl.value);
      slotSize.footerSize = 0;
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

  const renderList: ShallowRef<T[]> = shallowRef([]);
  watch(
    // 这里为什么用 renderKey 代替监听 props.list
    // 因为props.list会导致v-for时deepArray导致大量的性能浪费
    () => [reactiveData.inViewBegin, reactiveData.inViewEnd, renderKey.value],
    (newVal, oldVal) => {
      if (newVal && oldVal) {
        // console.log('watch', newVal, oldVal);
        const [_newInViewBegin] = newVal;

        // 旧的渲染起始
        const _oldRenderBegin = reactiveData.renderBegin;

        // 新的渲染起始
        let _newRenderBegin = _newInViewBegin;
        // 新的渲染结束
        let _newRenderEnd = reactiveData.inViewEnd;

        // 控制层渲染
        if (props?.controlRender) {
          const { begin, end } = props.controlRender(
            _newInViewBegin,
            reactiveData.inViewEnd,
          );
          _newRenderBegin = begin;
          _newRenderEnd = end;
        }

        // 计算buffer
        _newRenderBegin = Math.max(0, _newRenderBegin - reactiveData.bufferTop);
        _newRenderEnd = Math.min(
          _newRenderEnd + reactiveData.bufferBottom,
          props.list.length,
        );

        // update render begin
        reactiveData.renderBegin = _newRenderBegin;
        // update render end
        reactiveData.renderEnd = _newRenderEnd;
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
        // update render list
        renderList.value = props.list.slice(
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
      updateRange(reactiveData.inViewBegin);
      // [require] 起始位置可能不变，但列表元素发生变化，所以强制渲染一次
      forceUpdate();
    },
    {
      immediate: true,
    },
  );

  return {
    props,

    renderList,

    clientRefEl,
    listRefEl,
    headerRefEl,
    footerRefEl,
    stickyHeaderRefEl,
    stickyFooterRefEl,

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
}
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
    controlRender: {
      type: Function,
      default: undefined,
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
    listClass: {
      type: String,
      default: '',
    },
    itemStyle: {
      type: String,
      default: '',
    },
    itemClass: {
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
  setup(props: any, context: SetupContext) {
    const emitFunction: EmitFunction<any> = {
      scroll: (evt: Event) => {
        context.emit('scroll', evt);
      },
      toTop: (firstItem: any) => {
        context.emit('toTop', firstItem);
      },
      toBottom: (lastItem: any) => {
        context.emit('toBottom', lastItem);
      },
      itemResize: (id: string, newSize: number) => {
        context.emit('itemResize', id, newSize);
      },
    };

    return useVirtualList(props, emitFunction);
  },
  render() {
    const { renderList, reactiveData, resizeObserver } = this;
    const {
      itemKey,
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
      stickyFooterStyle,
    } = this.props;

    const renderStickyHeaderSlot = (): VNode | null => {
      return this.$slots.stickyHeader
        ? h(
            'div',
            polyfillAttr(
              {
                key: 'slot-sticky-header',
                class: stickyHeaderClass,
                style: `position: sticky; z-index: 10; ${
                  horizontal ? 'left: 0' : 'top: 0;'
                } ${stickyHeaderStyle}`,
                ref: 'stickyHeaderRefEl',
              },
              {
                'data-id': 'stickyHeader',
              },
            ),
            [polyfillSlot(this.$slots.stickyHeader)],
          )
        : null;
    };

    const renderStickyFooterSlot = (): VNode | null => {
      return this.$slots.stickyFooter
        ? h(
            'div',
            polyfillAttr(
              {
                key: 'slot-sticky-footer',
                class: stickyFooterClass,
                style: `position: sticky; z-index: 10; ${
                  horizontal ? 'right: 0' : 'bottom: 0;'
                } ${stickyFooterStyle}`,
                ref: 'stickyFooterRefEl',
              },
              {
                'data-id': 'stickyFooter',
              },
            ),
            [polyfillSlot(this.$slots.stickyFooter)],
          )
        : null;
    };

    const renderHeaderSlot = (): VNode | null => {
      return this.$slots.header
        ? h(
            'div',
            polyfillAttr(
              {
                key: 'slot-header',
                class: headerClass,
                style: headerStyle,
                ref: 'headerRefEl',
              },
              {
                'data-id': 'header',
              },
            ),
            [polyfillSlot(this.$slots.header)],
          )
        : null;
    };

    const renderFooterSlot = (): VNode | null => {
      return this.$slots.footer
        ? h(
            'div',
            polyfillAttr(
              {
                key: 'slot-footer',
                class: footerClass,
                style: footerStyle,
                ref: 'footerRefEl',
              },
              {
                'data-id': 'footer',
              },
            ),
            [polyfillSlot(this.$slots.footer)],
          )
        : null;
    };

    const { listTotalSize, virtualSize, renderBegin } = reactiveData;

    const renderMainList = (): VNode | null => {
      const mainList = [];
      for (let index = 0; index < renderList.length; index += 1) {
        const currentItem = renderList[index];
        mainList.push(
          h(
            ObserverItem,
            polyfillAttr(
              {
                key: currentItem[itemKey],
                class: itemClass,
                style: itemStyle,
              },
              {
                id: currentItem[itemKey],
                resizeObserver: resizeObserver,
              },
            ),
            polyfillChildren([
              isVue2
                ? this.$scopedSlots?.default?.({
                    itemData: currentItem,
                    index: renderBegin + index,
                  })
                : (this.$slots as any).default?.({
                    itemData: currentItem,
                    index: renderBegin + index,
                  }),
            ]) as VNodeChildren,
          ),
        );
      }

      const dynamicListStyle = horizontal
        ? `will-change: width; min-width: ${listTotalSize}px; display: flex; ${listStyle}`
        : `will-change: height; min-height: ${listTotalSize}px; ${listStyle}`;

      return h(
        'div',
        {
          ref: 'listRefEl',
          class: listClass,
          style: dynamicListStyle,
        },
        [
          h('div', {
            style: horizontal
              ? `width: ${virtualSize}px; will-change: width;`
              : `height: ${virtualSize}px; will-change: height;`,
          }),
          mainList,
        ],
      );
    };

    // const renderVirtualScrollbar = () => {
    //   return <div style={`float: left; height: ${listTotalSize}px`}></div>; // 虚拟滚动条
    // };

    return h(
      'div',
      polyfillAttr(
        {
          ref: 'clientRefEl',
          class: 'virtual-list__client',
          style: `width: 100%; height: 100%; overflow: overlay;`,
        },
        {
          'data-id': 'client',
        },
      ),
      polyfillChildren([
        renderStickyHeaderSlot(),
        renderHeaderSlot(),
        renderMainList(),
        renderFooterSlot(),
        renderStickyFooterSlot(),
      ]) as VNodeChildren,
    );
  },
});

export { VirtualList, ObserverItem, useVirtualList, useObserverItem };
