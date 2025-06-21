import { ConfigEnv, defineConfig, UserConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import { server, define } from './vite.common'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'bootstrap-vue-next'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {

  return {
    ...define(mode),
    ...server(mode),
    plugins: [vue(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
      // exclude: [/\/__tests__\//],
    }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@shared': path.resolve(__dirname, '../../packages/shared'),
        '@zod': path.resolve(__dirname, '../../packages/shared/zod')
      },
    },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/tests/setup.ts'],
      include: ['src/**/__tests__/**/*.{spec,test}.ts'],
      exclude: ['e2e/**']
    }
  }
})
