import type { ObserverItemProps } from './type';
declare const useObserverItem: (props: ObserverItemProps) => {
    itemRefEl: import("vue-demi").Ref<null>;
};
declare const ObserverItem: import("vue-demi").DefineComponent<{
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
    itemRefEl: import("vue-demi").Ref<null>;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {}, string, import("vue-demi").PublicProps, Readonly<import("vue-demi").ExtractPropTypes<{
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
}>>, {}, {}>;
export { ObserverItem, useObserverItem };
