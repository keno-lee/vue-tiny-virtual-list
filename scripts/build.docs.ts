import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [vue(), vueJsx()],

  root: './example',
  base: '',
  build: {
    outDir: path.join(__dirname, '../docs'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../', import.meta.url)),
    },
  },
}));
