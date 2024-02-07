import type { Ref, ShallowReactive, VNodeChild } from 'vue-demi';
export type ObserverItemProps = {
    resizeObserver: ResizeObserver;
};
export type RawChildren = VNodeChild[] | {
    default: () => VNodeChild[];
};
export type ReactiveData = {
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
interface BaseListProps<T extends Record<string, string>> {
    list: T[];
    itemKey: string | number;
    minSize: number;
    scrollDistance?: number;
    headerClass?: string;
    headerStyle?: string;
    footerClass?: string;
    footerStyle?: string;
    stickyHeaderClass?: string;
    stickyHeaderStyle?: string;
    stickyFooterClass?: string;
    stickyFooterStyle?: string;
}
export interface RealListProps<T extends Record<string, string>> extends BaseListProps<T> {
    pageSize: number;
}
export interface VirtualListProps<T extends Record<string, string>> extends BaseListProps<T> {
    renderControl?: (begin: number, end: number) => {
        begin: number;
        end: number;
    };
    fixed?: boolean;
    buffer?: number;
    bufferTop?: number;
    bufferBottom?: number;
    horizontal?: boolean;
    start?: number;
    offset?: number;
    listStyle?: string;
    listClass?: string;
    itemStyle?: string;
    itemClass?: string;
}
export interface EmitFunction<T> {
    scroll?: (e: Event) => void;
    toTop?: (item: T) => void;
    toBottom?: (item: T) => void;
    itemResize?: (id: string, newSize: number) => void;
}
export interface NormalEmitFunction<T> extends EmitFunction<T> {
    updateCurrent?: (key: string | number) => void;
}
export type SlotSize = {
    clientSize: number;
    headerSize: number;
    footerSize: number;
    stickyHeaderSize: number;
    stickyFooterSize: number;
};
export type VirtualListReturn<T extends Record<string, string>> = {
    props: Required<VirtualListProps<T>>;
    renderList: Ref<T[]>;
    clientRefEl: Ref<HTMLElement | null>;
    listRefEl: Ref<HTMLElement | null>;
    headerRefEl: Ref<HTMLElement | null>;
    footerRefEl: Ref<HTMLElement | null>;
    stickyHeaderRefEl: Ref<HTMLElement | null>;
    stickyFooterRefEl: Ref<HTMLElement | null>;
    reactiveData: ShallowReactive<ReactiveData>;
    slotSize: ShallowReactive<SlotSize>;
    sizesMap: Map<string, number>;
    resizeObserver: ResizeObserver | undefined;
    getOffset: () => number;
    reset: () => void;
    scrollToIndex: (index: number) => void;
    scrollIntoView: (index: number) => void;
    scrollToTop: () => void;
    scrollToBottom: () => void;
    scrollToOffset: (offset: number) => void;
    getItemSize: (itemKey: string) => number;
    deleteItemSize: (itemKey: string) => void;
    deletedList2Top: (preList: T[]) => void;
    addedList2Top: (preList: T[]) => void;
    getItemPosByIndex: (index: number) => {
        top: number;
        current: number;
        bottom: number;
    };
    forceUpdate: () => void;
};
export {};
