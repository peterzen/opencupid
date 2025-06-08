import fp from 'fastify-plugin'
import websocket, { SocketStream } from '@fastify/websocket'
import { FastifyInstance } from 'fastify'

interface WsMessage {
  to: string
  content: string
}

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(websocket)
  fastify.decorate('connections', {} as Record<string, SocketStream['socket']>)

  fastify.get('/ws', { websocket: true, onRequest: [fastify.authenticate] }, (conn, req) => {
    const userId = req.user!.userId
    fastify.connections[userId] = conn.socket

    conn.socket.on('close', () => {
      delete fastify.connections[userId]
    })

    conn.socket.on('message', async (raw) => {
      try {
        const data = JSON.parse(raw.toString()) as WsMessage
        if (!data.to || !data.content) return
        const msg = await fastify.messageService.sendMessage(userId, data.to, data.content)
        const receiver = fastify.connections[data.to]
        if (receiver && receiver.readyState === receiver.OPEN) {
          receiver.send(JSON.stringify({
            id: msg.id,
            from: userId,
            content: msg.content,
            createdAt: msg.createdAt
          }))
        }
      } catch (err) {
        fastify.log.error('Invalid WS message', err)
      }
    })
  })
})
