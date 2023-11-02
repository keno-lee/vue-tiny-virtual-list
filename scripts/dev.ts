import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
// import legacy from '@vitejs/plugin-legacy';
import vue2 from '@vitejs/plugin-vue2';
import vue2Jsx from '@vitejs/plugin-vue2-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  plugins: [
    vue2(),
    vue2Jsx({
      compositionAPI: true,
    }),
    // legacy({
    //   targets: ['ie >= 11'],
    //   additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../', import.meta.url)),
    },
  },
});
