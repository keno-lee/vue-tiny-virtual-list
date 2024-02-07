/* eslint-disable @typescript-eslint/no-explicit-any */
import { isVue2 } from 'vue-demi';
import type { RawChildren } from './type';

export function polyfillAttr(
  rest: Record<string, any>,
  attrs: Record<string, any>,
) {
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

export function polyfillChildren(children: any[]): RawChildren {
  return isVue2
    ? children
    : {
        default: () => children,
      };
}

export function polyfillSlot(slot: any) {
  return isVue2 ? slot : slot?.();
}
