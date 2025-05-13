import Fastify from 'fastify'
import env from './env'

const app = Fastify({ logger: true })

app.register(import('./plugins/prisma'))
app.register(import('./plugins/auth'))
app.register(import('./api'))

app.listen({ port: env.PORT }, (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
