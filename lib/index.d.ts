import { type ShallowRef } from 'vue-demi';
declare const VirtualList: import("vue-demi").DefineComponent<{
    list: {
        type: {
            (arrayLength: number): any[];
            (...items: any[]): any[];
            new (arrayLength: number): any[];
            new (...items: any[]): any[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
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
}, {
    props: Readonly<Readonly<import("vue/types/common").LooseRequired<{
        fixed: boolean;
        buffer: number;
        offset: number;
        start: number;
        listStyle: string;
        horizontal: boolean;
        list: any[];
        itemKey: string | number;
        minSize: number;
        bufferTop: number;
        bufferBottom: number;
        scrollDistance: number;
        headerClass: string;
        headerStyle: string;
        footerClass: string;
        footerStyle: string;
        stickyHeaderClass: string;
        stickyHeaderStyle: string;
        stickyFooterClass: string;
        stickyFooterStyle: string;
    } & {}>>>;
    filterList: ShallowRef<any[]>;
    clientRef: import("vue-demi").Ref<import("vue-demi").DefineComponent<{
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
    }, {
        itemRefEl: any;
    }, {}, {}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue-demi").ExtractPropTypes<{
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
    }>>, {}>>;
    listRefEl: import("vue-demi").Ref<HTMLElement>;
    reactiveData: {
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
    getOffset: () => any;
    reset: () => void;
    scrollToIndex: (index: number) => Promise<void>;
    scrollIntoView: (index: number) => Promise<void>;
    scrollToTop: () => Promise<void>;
    scrollToBottom: () => Promise<void>;
    scrollToOffset: (offset: number) => void;
    getItemSize: (itemKey: string) => any;
    deleteItemSize: (itemKey: string) => void;
    decreaseTopSize: (prevList: []) => void;
    increaseTopSize: (prevList: []) => void;
    getItemPosByIndex: (index: number) => {
        top: number;
        current: any;
        bottom: any;
    };
    forceUpdate: () => void;
    resizeObserver: ResizeObserver;
    sizesMap: Map<any, any>;
    slotSize: {
        clientSize: number;
        headerSize: number;
        footerSize: number;
        stickyHeaderSize: number;
        stickyFooterSize: number;
    };
}, {}, {}, {}, import("vue/types/v3-component-options").ComponentOptionsMixin, import("vue/types/v3-component-options").ComponentOptionsMixin, {}, string, Readonly<import("vue-demi").ExtractPropTypes<{
    list: {
        type: {
            (arrayLength: number): any[];
            (...items: any[]): any[];
            new (arrayLength: number): any[];
            new (...items: any[]): any[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any): U[];
            from<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>): T_2[];
            from<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any): U_1[];
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
}>>, {
    fixed: boolean;
    buffer: number;
    offset: number;
    start: number;
    listStyle: string;
    horizontal: boolean;
    list: any[];
    minSize: number;
    bufferTop: number;
    bufferBottom: number;
    scrollDistance: number;
    headerClass: string;
    headerStyle: string;
    footerClass: string;
    footerStyle: string;
    stickyHeaderClass: string;
    stickyHeaderStyle: string;
    stickyFooterClass: string;
    stickyFooterStyle: string;
}>;
export { VirtualList };
