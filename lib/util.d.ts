import type { RawChildren } from './type';
export declare function polyfillAttr(rest: Record<string, any>, attrs: Record<string, any>): {
    attrs: Record<string, any>;
} | {
    [x: string]: any;
};
export declare function polyfillChildren(children: any[]): RawChildren;
export declare function polyfillSlot(slot: any): any;
