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
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    svgLoader(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
  ],
  resolve: {

    alias: {
      '@': path.resolve(__dirname, './src'),
      '@opencupid/shared': path.resolve(__dirname, '../../packages/shared'),
      '@zod/generated': path.resolve(__dirname, '../../packages/shared/zod/generated')
    },
  },
})
