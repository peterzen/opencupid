import path from "path";
import fs from 'fs'
import { loadEnv } from "vite";


export const server = (mode: string) => {
  if (mode !== 'development') return {}

  return {
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
        '/geo': {
          target: 'http://ifconfig.co/',
          changeOrigin: true,
          secure: false, // accept self-signed TLS
          rewrite: (path: any) => path.replace(/^\/geo/, '/json'),
        },
      },
      https: {
        key: fs.readFileSync(path.resolve(__dirname, '../../certs/key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, '../../certs/cert.pem')),
      },
    }
  }
}

export const define = (mode: string) => {

  const rootEnv = mode === 'production' ? process.env : loadEnv(mode, '../../', '')
  return {
    envDir: '../../',
    define: {
      __APP_CONFIG__: JSON.stringify({
        API_BASE_URL: rootEnv.API_BASE_URL,
        WS_BASE_URL: rootEnv.WS_BASE_URL,
        IMAGE_URL_BASE: rootEnv.IMAGE_URL_BASE,
        FRONTEND_URL: rootEnv.FRONTEND_URL,
        NODE_ENV: rootEnv.NODE_ENV,
        VAPID_PUBLIC_KEY: rootEnv.VAPID_PUBLIC_KEY,
        GEOIP_URL: rootEnv.GEOIP_URL
      }),
    }
  }
}