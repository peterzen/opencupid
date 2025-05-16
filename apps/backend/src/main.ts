import Fastify from 'fastify'
import cors from '@fastify/cors' // Import the CORS plugin
import env from './env'

import './workers/emailWorker'   // ← side‐effect: starts the worker

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

app.listen({ port: env.PORT }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
