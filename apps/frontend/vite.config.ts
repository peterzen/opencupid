import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'bootstrap-vue-next'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ['localhost', 'oc.dev.froggle.org'],
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'altcha-widget'
        }
      }
    }),
    vueJsx(),
    vueDevTools(),
    svgLoader(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          'import',
          'mixed-decls',
          'color-functions',
          'global-builtin',
        ],
        includePaths: ['node_modules'],
        quietDeps: true,
      },
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@opencupid/shared': path.resolve(__dirname, '../../packages/shared'),
      '@zod': path.resolve(__dirname, '../../packages/shared/zod')
    },
  },
})
