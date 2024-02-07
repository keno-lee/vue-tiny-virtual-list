import { defineConfig } from 'vitepress';
import { fileURLToPath } from 'node:url';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'vue-tiny-virtual-list',
  description: 'vue-tiny-virtual-list',

  // head: [['link', { rel: 'icon', href: '/vue-tiny-virtual-list/favicon.ico' }]],

  base: '/vue-tiny-virtual-list/',

  outDir: fileURLToPath(new URL('../../docs', import.meta.url)),

  assetsDir: '/public',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Examples', link: '/examples/base/' },
      { text: 'API', link: '/api/' },
      // { text: 'Playground', link: '/playground/' },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/keno-lee/vue-tiny-virtual-list',
      },
    ],

    sidebar: {
      '/examples/': [
        {
          text: 'Guide',
          items: [
            { text: '开始使用', link: '/examples/start/' },
            { text: '特殊说明', link: '/examples/instructions/' },
            // { text: '主题', link: '/examples/theme/' },
            { text: '基础示例', link: '/examples/base/' },
            // { text: '高性能', link: '/examples/performance/' },
            { text: '固定高度', link: '/examples/fixed/' },
            { text: '水平滚动', link: '/examples/horizontal/' },
            { text: '插槽', link: '/examples/slot/' },
            { text: '各类操作', link: '/examples/operate/' },
            { text: '可变窗口大小', link: '/examples/resize/' },

            { text: '可变高度', link: '/examples/dynamic/' },
            { text: '表格', link: '/examples/table/' },
            { text: '无限加载', link: '/examples/infinity/' },
            { text: '聊天室', link: '/examples/chat/' },

            {
              text: 'Advance',
              collapsed: false,
              items: [
                { text: '高阶用法', link: '/examples/advanced/' },
                {
                  text: '分页-虚拟列表',
                  link: '/examples/pagination-virtual/',
                },
                { text: '分页-真实列表', link: '/examples/pagination-real/' },
              ],
            },
          ],
        },
      ],
    },
  },

  markdown: {
    container: {
      detailsLabel: '源码',
    },
    config(md) {
      md.core.ruler.before(
        'block',
        'vue-tiny-virtual-list-example-snippet-pre',
        (state) => {
          const regex = /<!<< (.+)/;
          let result = regex.exec(state.src);
          while (result) {
            const [, match] = result;
            state.src = state.src.replace(
              regex,
              `
<!!<< ${match}
::: details
  <<< ${match}
:::
        `,
            );
            result = regex.exec(state.src);
          }
        },
      );

      md.block.ruler.before(
        'table',
        'vue-tiny-virtual-list-example-snippet',
        (state, startLine, endLine) => {
          const regex = /<!!<< (.+)/;
          let start = state.bMarks[startLine] + state.tShift[startLine];
          let max = state.eMarks[startLine];
          const result = regex.exec(state.src.slice(start, max));
          if (!result) {
            return false;
          }
          const [, sourceFile] = result;

          const ViewName = sourceFile
            .replace('.vue', '')
            .replace(/\.*?\//g, '');
          let scriptToken = state.tokens.find((token) =>
            /<script( setup)?>/.test(token.content),
          )!;
          if (!scriptToken) {
            scriptToken = state.push('html_block', '', 0);
            scriptToken.content = '<script setup>\n</script>\n';
            scriptToken.block = true;
          }
          scriptToken.content = scriptToken.content.replace(
            /<script(.*)>\n/,
            `<script$1>\nimport ${ViewName} from  '${sourceFile}' \n`,
          );

          const token = state.push('html_inline', '', 0);
          token.content = `<ClientOnly><${ViewName}/></ClientOnly>`;
          token.block = false;
          token.map = [startLine, startLine + 1];

          state.line++;
          return true;
        },
      );
    },
  },
  vite: {
    // configFile: path.resolve(__dirname, '../../scripts/dev.ts'),
    plugins: [vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../', import.meta.url)),
        'vue-tiny-virtual-list': fileURLToPath(
          new URL('../../src/index.ts', import.meta.url),
        ),
      },
    },
    ssr: {
      noExternal: ['@vue/repl'],
    },
    // build: {
    //   rollupOptions: {
    //     output: {
    //       manualChunks: {
    //         'vue-tiny-virtual-list': ['vue-tiny-virtual-list'],
    //       },
    //       chunkFileNames(chunkInfo) {
    //         if (chunkInfo.name === 'vue-tiny-virtual-list') {
    //           return 'public/[name].js';
    //         }
    //         return 'public/[name].[hash].js'
    //       },
    //       minifyInternalExports: false,
    //     }
    // },
    // }
  },
});
