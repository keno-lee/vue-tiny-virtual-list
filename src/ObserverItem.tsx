import { defineComponent, h, onBeforeUnmount, onMounted, ref } from 'vue-demi';
import type { ObserverItemProps } from './type';
import { polyfillSlot, polyfillAttr } from './util';

const useObserverItem = (props: ObserverItemProps) => {
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
};
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

export { ObserverItem, useObserverItem };
