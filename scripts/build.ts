import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // optimizeDeps: {
  //   exclude: ['vue-demi'],
  // },
  plugins: [vue(), vueJsx()],

  // resolve: {
  //   alias: {
  //     '@': fileURLToPath(new URL('../example', import.meta.url)),
  //   },
  // },
  build: {
    emptyOutDir: true,
    minify: false,
    sourcemap: true,
    target: ['chrome62'],

    rollupOptions: {
      external: ['vue', 'vue-demi'],
      preserveEntrySignatures: 'strict',

      input: './src/index.ts',
      output: {
        manualChunks: undefined,
        format: 'es',
        dir: './lib',
        // preserveModules: true,
        entryFileNames: '[name].js',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../', import.meta.url)),
    },
  },
}));
