
import Sentry from '@/lib/sentry' // keep this at the top

import Fastify from 'fastify'
import cors from '@fastify/cors'
import { appConfig } from '@/lib/appconfig'
import './lib/i18n' // Initialize i18next with translations

import './workers/emailWorker' // ← side‐effect: starts the worker
import { checkImageRoot } from '@/lib/media'

import { ImageProcessor } from './services/imageprocessor'
import fs from 'fs'
import path from 'path'

async function main() {
  const app = Fastify({
    trustProxy: true,
    logger: {
      transport:
        appConfig.NODE_ENV === 'production'
          ? undefined
          : {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          },
    },
  })

  // Log version information at startup
  try {
    const versionPath = path.join(process.cwd(), 'dist', 'version.json')
    
    if (fs.existsSync(versionPath)) {
      const versionData = JSON.parse(fs.readFileSync(versionPath, 'utf8'))
      app.log.info({
        app: versionData.app || 'unknown',
        frontend: versionData.frontend || 'unknown', 
        backend: versionData.backend || 'unknown',
        commit: versionData.commit || 'unknown',
        timestamp: versionData.timestamp || 'unknown'
      }, '🚀 Starting server with version info')
    } else {
      app.log.info('🚀 Starting server (version.json not found)')
    }
  } catch (err) {
    app.log.warn('Could not read version info at startup:', err)
  }

  // Register CORS plugin
  app.register(cors, {
    origin: appConfig.NODE_ENV === 'production' ? appConfig.FRONTEND_URL : '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH'],
  })

  app.register(import('./plugins/websockets'))
  app.register(import('./plugins/prisma'))
  app.register(import('./plugins/session-auth'))
  app.register(import('./plugins/rate-limiter'))

  // API routes
  app.register(import('./api'), { prefix: '/api' })

  // WebSocket routes
  const wsRoutes = import('./api/routes/message-ws.route')
  app.register(wsRoutes, { prefix: '/ws' })

  const ok = checkImageRoot()
  if (!ok) {
    app.log.error('Media upload directory cannot be created or is not writable')
    process.exit(1)
  }

  // load face detection models
  await ImageProcessor.initialize()

  app.listen(
    {
      port: appConfig.API_PORT,
      host: '0.0.0.0', // Listen on all interfaces
    },
    err => {
      if (err) {
        app.log.error(err)
        process.exit(1)
      }
    }
  )
}



main().catch(err => {
  console.error(err)
  Sentry.captureException(err)
  process.exit(1)
})