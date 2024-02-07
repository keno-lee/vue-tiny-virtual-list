import { type ShallowReactive } from 'vue-demi';
import type { SlotSize, RealListProps } from './type';
declare const RealList: import("vue-demi").DefineComponent<{
    itemKey: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
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
        default: () => never[];
    };
    minSize: {
        type: NumberConstructor;
        default: number;
    };
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    scrollDistance: {
        type: NumberConstructor;
        default: number;
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
    props: Required<RealListProps<any>>;
    resizeObserver: ResizeObserver | undefined;
    sizesMap: Map<any, any>;
    slotSize: ShallowReactive<SlotSize>;
    clientRefEl: import("vue-demi").Ref<HTMLElement | null>;
    listRefEl: import("vue-demi").Ref<HTMLElement | null>;
    headerRefEl: import("vue-demi").Ref<HTMLElement | null>;
    footerRefEl: import("vue-demi").Ref<HTMLElement | null>;
    stickyHeaderRefEl: import("vue-demi").Ref<HTMLElement | null>;
    stickyFooterRefEl: import("vue-demi").Ref<HTMLElement | null>;
    scrollIntoView: (index: number) => Promise<unknown>;
    scrollToIndex: (index: number) => Promise<unknown> | undefined;
    reset: () => void;
    getItemOffset: (itemKey: string) => any;
    getCurrentFirstItem: () => string;
    getOffsetByIndex: (index: number) => any;
    scrollToOffset: (offset: number) => void;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {}, string, import("vue-demi").PublicProps, Readonly<import("vue-demi").ExtractPropTypes<{
    itemKey: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
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
        default: () => never[];
    };
    minSize: {
        type: NumberConstructor;
        default: number;
    };
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    scrollDistance: {
        type: NumberConstructor;
        default: number;
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
    itemKey: string | number;
    list: any[];
    minSize: number;
    pageSize: number;
    scrollDistance: number;
    headerClass: string;
    headerStyle: string;
    footerClass: string;
    footerStyle: string;
    stickyHeaderClass: string;
    stickyHeaderStyle: string;
    stickyFooterClass: string;
    stickyFooterStyle: string;
}, {}>;
export { RealList };
