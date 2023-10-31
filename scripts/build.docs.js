import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import path from 'path';
import vue2 from '@vitejs/plugin-vue2';
import vue2Jsx from '@vitejs/plugin-vue2-jsx';
// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    vue2(),
    vue2Jsx({
      compositionAPI: true,
    }),
  ],
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
