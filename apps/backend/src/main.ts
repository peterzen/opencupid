import Fastify from 'fastify'
import cors from '@fastify/cors' // Import the CORS plugin
import staticSrv from '@fastify/static'
import env from './env'

import './workers/emailWorker'   // ← side‐effect: starts the worker
import { checkUploadBaseDir } from './lib/media'

const app = Fastify({ logger: true })

// Register CORS plugin
app.register(cors, {
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH']
})

app.register(import('./plugins/prisma'))
app.register(import('./plugins/auth'))
app.register(import('./api'))

checkUploadBaseDir()
app.register(staticSrv, {
  root: env.MEDIA_UPLOAD_DIR,
  prefix: env.MEDIA_UPLOAD_URL
})

app.listen({ port: env.PORT }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
