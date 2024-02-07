import { type ShallowReactive } from 'vue-demi';
import type { EmitFunction, VirtualListProps, VirtualListReturn } from './type';
declare function useVirtualList<T extends Record<string, any>>(userProps: ShallowReactive<VirtualListProps<T>>, emitFunction?: EmitFunction<T>): VirtualListReturn<T>;
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
        default: () => never[];
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
        default: undefined;
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
}, VirtualListReturn<any>, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, import("vue-demi").EmitsOptions, string, import("vue-demi").PublicProps, Readonly<import("vue-demi").ExtractPropTypes<{
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
        default: undefined;
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
}>>, {
    list: any[];
    minSize: number;
    scrollDistance: number;
    headerClass: string;
    headerStyle: string;
    footerClass: string;
    footerStyle: string;
    stickyHeaderClass: string;
    stickyHeaderStyle: string;
    stickyFooterClass: string;
    stickyFooterStyle: string;
    fixed: boolean;
    renderControl: Function;
    buffer: number;
    bufferTop: number;
    bufferBottom: number;
    horizontal: boolean;
    start: number;
    offset: number;
    listStyle: string;
    listClass: string;
    itemStyle: string;
    itemClass: string;
}, {}>;
export { VirtualList, useVirtualList };
