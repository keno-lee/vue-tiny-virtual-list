import { type Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';
import './custom.scss';
import 'resize-observer-polyfill/dist/ResizeObserver.global';

export default {
  extends: DefaultTheme,
  Layout,
} satisfies Theme;
