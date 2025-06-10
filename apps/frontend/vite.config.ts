import fs from 'fs'
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { BootstrapVueNextResolver } from 'bootstrap-vue-next'
import svgLoader from 'vite-svg-loader'
import serveStatic from 'serve-static'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const rootEnv = loadEnv(mode, '../../', '')
  return {
    envDir: '../../',
    define: {
      __APP_CONFIG__: JSON.stringify({
        API_BASE_URL: rootEnv.API_BASE_URL,
        WS_BASE_URL: rootEnv.WS_BASE_URL,
        IMAGE_URL_BASE: rootEnv.IMAGE_URL_BASE,
        FRONTEND_URL: rootEnv.FRONTEND_URL,
        NODE_ENV: rootEnv.NODE_ENV,
      }),
    },
    server: {
      allowedHosts: ['localhost', 'oc.dev.froggle.org'],
      proxy: {
        '/api': {
          target: 'http://localhost:3000', // or https://localhost:3000 if backend runs TLS
          changeOrigin: true,
          secure: false, // accept self-signed TLS
        },
        '/ws': {
          target: 'ws://localhost:3000',
          rewriteWsOrigin: true,
          ws: true,
          secure: false, // accept self-signed TLS
        },
      },
      https: {
        key: fs.readFileSync(path.resolve(__dirname, '../../certs/key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, '../../certs/cert.pem')),
      },
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag === 'altcha-widget',
          },
        },
      }),
      vueJsx(),
      vueDevTools(),
      svgLoader(),
      Components({
        resolvers: [BootstrapVueNextResolver()],
      }),
      {
        name: 'serve-static-images',
        configureServer(server) {
          server.middlewares.use(
            '/images',
            serveStatic(path.resolve(__dirname, rootEnv.MEDIA_UPLOAD_DIR)),
          )
        },
      },
    ],
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['import', 'mixed-decls', 'color-functions', 'global-builtin'],
          includePaths: ['node_modules'],
          quietDeps: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@shared': path.resolve(__dirname, '../../packages/shared'),
        '@zod': path.resolve(__dirname, '../../packages/shared/zod'),
      },
    },
  }
})
