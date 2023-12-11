import { type Ref } from 'vue-demi';
type ObserverItemProps = {
  resizeObserver: ResizeObserver;
};
declare function useObserverItem(props: ObserverItemProps): {
  itemRefEl: any;
};
declare const ObserverItem: import('vue-demi').DefineComponent<
  {
    resizeObserver: {
      type: {
        new (callback: ResizeObserverCallback): ResizeObserver;
        prototype: ResizeObserver;
      };
      require: boolean;
    };
    id: {
      type: (StringConstructor | NumberConstructor)[];
      require: boolean;
    };
  },
  {
    itemRefEl: any;
  },
  {},
  {},
  {},
  import('vue/types/v3-component-options').ComponentOptionsMixin,
  import('vue/types/v3-component-options').ComponentOptionsMixin,
  {},
  string,
  Readonly<
    import('vue-demi').ExtractPropTypes<{
      resizeObserver: {
        type: {
          new (callback: ResizeObserverCallback): ResizeObserver;
          prototype: ResizeObserver;
        };
        require: boolean;
      };
      id: {
        type: (StringConstructor | NumberConstructor)[];
        require: boolean;
      };
    }>
  >,
  {}
>;
type ReactiveData = {
  views: number;
  offset: number;
  listTotalSize: number;
  virtualSize: number;
  inViewBegin: number;
  inViewEnd: number;
  renderBegin: number;
  renderEnd: number;
  bufferTop: number;
  bufferBottom: number;
};
type VirtualListProps<T extends Record<string, string>> = {
  list: T[];
  itemKey: string | number;
  minSize: number;
  renderControl?: (
    begin: number,
    end: number,
  ) => {
    begin: number;
    end: number;
  };
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
  slotSize: SlotSize;
};
declare function useVirtualList<T extends Record<string, any>>(
  userProps: VirtualListProps<T>,
  emitFunction?: EmitFunction<T>,
): VirtualListReturn<T>;
declare const VirtualList: import('vue-demi').DefineComponent<
  {
    list: {
      type: {
        (arrayLength: number): any[];
        (...items: any[]): any[];
        new (arrayLength: number): any[];
        new (...items: any[]): any[];
        isArray(arg: any): arg is any[];
        readonly prototype: any[];
        from<T>(arrayLike: ArrayLike<T>): T[];
        from<T_1, U>(
          arrayLike: ArrayLike<T_1>,
          mapfn: (v: T_1, k: number) => U,
          thisArg?: any,
        ): U[];
        from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
        from<T_3, U_1>(
          iterable: Iterable<T_3> | ArrayLike<T_3>,
          mapfn: (v: T_3, k: number) => U_1,
          thisArg?: any,
        ): U_1[];
        of<T_4>(...items: T_4[]): T_4[];
        readonly [Symbol.species]: ArrayConstructor;
      };
      default: () => any[];
    };
    itemKey: {
      type: (StringConstructor | NumberConstructor)[];
      required: true;
    };
    minSize: {
      type: NumberConstructor;
      default: number;
      required: true;
    };
    renderControl: {
      type: FunctionConstructor;
      default: any;
    };
    fixed: {
      type: BooleanConstructor;
      default: boolean;
    };
    buffer: {
      type: NumberConstructor;
      default: number;
    };
    bufferTop: {
      type: NumberConstructor;
      default: number;
    };
    bufferBottom: {
      type: NumberConstructor;
      default: number;
    };
    scrollDistance: {
      type: NumberConstructor;
      default: number;
    };
    horizontal: {
      type: BooleanConstructor;
      default: boolean;
    };
    start: {
      type: NumberConstructor;
      default: number;
    };
    offset: {
      type: NumberConstructor;
      default: number;
    };
    listStyle: {
      type: StringConstructor;
      default: string;
    };
    listClass: {
      type: StringConstructor;
      default: string;
    };
    itemStyle: {
      type: StringConstructor;
      default: string;
    };
    itemClass: {
      type: StringConstructor;
      default: string;
    };
    headerClass: {
      type: StringConstructor;
      default: string;
    };
    headerStyle: {
      type: StringConstructor;
      default: string;
    };
    footerClass: {
      type: StringConstructor;
      default: string;
    };
    footerStyle: {
      type: StringConstructor;
      default: string;
    };
    stickyHeaderClass: {
      type: StringConstructor;
      default: string;
    };
    stickyHeaderStyle: {
      type: StringConstructor;
      default: string;
    };
    stickyFooterClass: {
      type: StringConstructor;
      default: string;
    };
    stickyFooterStyle: {
      type: StringConstructor;
      default: string;
    };
  },
  VirtualListReturn<any>,
  {},
  {},
  {},
  import('vue/types/v3-component-options').ComponentOptionsMixin,
  import('vue/types/v3-component-options').ComponentOptionsMixin,
  {},
  string,
  Readonly<
    import('vue-demi').ExtractPropTypes<{
      list: {
        type: {
          (arrayLength: number): any[];
          (...items: any[]): any[];
          new (arrayLength: number): any[];
          new (...items: any[]): any[];
          isArray(arg: any): arg is any[];
          readonly prototype: any[];
          from<T>(arrayLike: ArrayLike<T>): T[];
          from<T_1, U>(
            arrayLike: ArrayLike<T_1>,
            mapfn: (v: T_1, k: number) => U,
            thisArg?: any,
          ): U[];
          from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
          from<T_3, U_1>(
            iterable: Iterable<T_3> | ArrayLike<T_3>,
            mapfn: (v: T_3, k: number) => U_1,
            thisArg?: any,
          ): U_1[];
          of<T_4>(...items: T_4[]): T_4[];
          readonly [Symbol.species]: ArrayConstructor;
        };
        default: () => any[];
      };
      itemKey: {
        type: (StringConstructor | NumberConstructor)[];
        required: true;
      };
      minSize: {
        type: NumberConstructor;
        default: number;
        required: true;
      };
      renderControl: {
        type: FunctionConstructor;
        default: any;
      };
      fixed: {
        type: BooleanConstructor;
        default: boolean;
      };
      buffer: {
        type: NumberConstructor;
        default: number;
      };
      bufferTop: {
        type: NumberConstructor;
        default: number;
      };
      bufferBottom: {
        type: NumberConstructor;
        default: number;
      };
      scrollDistance: {
        type: NumberConstructor;
        default: number;
      };
      horizontal: {
        type: BooleanConstructor;
        default: boolean;
      };
      start: {
        type: NumberConstructor;
        default: number;
      };
      offset: {
        type: NumberConstructor;
        default: number;
      };
      listStyle: {
        type: StringConstructor;
        default: string;
      };
      listClass: {
        type: StringConstructor;
        default: string;
      };
      itemStyle: {
        type: StringConstructor;
        default: string;
      };
      itemClass: {
        type: StringConstructor;
        default: string;
      };
      headerClass: {
        type: StringConstructor;
        default: string;
      };
      headerStyle: {
        type: StringConstructor;
        default: string;
      };
      footerClass: {
        type: StringConstructor;
        default: string;
      };
      footerStyle: {
        type: StringConstructor;
        default: string;
      };
      stickyHeaderClass: {
        type: StringConstructor;
        default: string;
      };
      stickyHeaderStyle: {
        type: StringConstructor;
        default: string;
      };
      stickyFooterClass: {
        type: StringConstructor;
        default: string;
      };
      stickyFooterStyle: {
        type: StringConstructor;
        default: string;
      };
    }>
  >,
  {
    fixed: boolean;
    buffer: number;
    offset: number;
    start: number;
    listStyle: string;
    horizontal: boolean;
    list: any[];
    minSize: number;
    renderControl: Function;
    bufferTop: number;
    bufferBottom: number;
    scrollDistance: number;
    listClass: string;
    itemStyle: string;
    itemClass: string;
    headerClass: string;
    headerStyle: string;
    footerClass: string;
    footerStyle: string;
    stickyHeaderClass: string;
    stickyHeaderStyle: string;
    stickyFooterClass: string;
    stickyFooterStyle: string;
  }
>;
export { VirtualList, ObserverItem, useVirtualList, useObserverItem };
