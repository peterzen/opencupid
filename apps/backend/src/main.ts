import Fastify from 'fastify'
import cors from '@fastify/cors' // Import the CORS plugin
// import staticSrv from '@fastify/static'
import env from './env'

import './workers/emailWorker'   // ← side‐effect: starts the worker
import { checkUploadBaseDir } from './lib/media'

const app = Fastify({
  logger: {
    transport: process.env.NODE_ENV === 'production'
      ? undefined
      : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname'
        }
      }
  }
})

// Register CORS plugin
app.register(cors, {
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH']
})

app.register(import('./plugins/prisma'))
app.register(import('./plugins/auth'))
app.register(import('./plugins/user-service'))
app.register(import('./plugins/profile-service'))
app.register(import('./plugins/gallery-service'))
app.register(import('./plugins/tag-service'))
app.register(import('./api'))

// app.register(staticSrv, {
//   root: env.MEDIA_UPLOAD_DIR,
// })

const ok = checkUploadBaseDir()
if (!ok) {
  app.log.error("Media upload directory cannot be created or is not writable")
  process.exit(1)
}

app.listen({ port: env.PORT }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
