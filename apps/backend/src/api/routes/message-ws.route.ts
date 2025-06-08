import { FastifyPluginAsync } from 'fastify'
import websocket from '@fastify/websocket'

import { sendUnauthorizedError } from '../helpers'
import { verifyWsToken } from '@/lib/verifyWsToken'

interface WsMessage {
  to: string // recipient userId
  content: string // message content
}

const messageWsRoutes: FastifyPluginAsync = async (fastify) => {

  fastify.register(websocket)
  fastify.decorate('connections', {} as Record<string, WebSocket>)

  fastify.addHook('preValidation', async (req, reply) => {

    // populate session for ws handler
    // FIXME fix typing of req.request

    // parse token variable from query string
    try {
      console.log('Verifying WebSocket token',req.query)
      const payload = verifyWsToken(req, fastify.jwt) // fix req.reuqest typing
      if (!payload || !payload.userId) {
        return sendUnauthorizedError(reply, 'Invalid or missing token')
      }
      req.raw.user = payload
    } catch (err) {
      fastify.log.error('Failed to verify WebSocket token', err)
      return sendUnauthorizedError(reply, 'Invalid or missing token')
    }
  })

  fastify.get('/message', { websocket: true }, (conn, req) => {

    const userId = req.raw.req.user.userId
    // TODO handle case where userId is not present, close connection
    fastify.connections[userId] = conn.socket

    conn.socket.on('close', () => {
      fastify.log.info(`WebSocket connection closed for user ${userId}`)
      delete fastify.connections[userId]
    })

    // TODO add debug logging for other WS events like 'error', 'ping', etc.

    // TOD implement automatic reconnect

    conn.socket.on('message', async (raw: any) => {
      // TODO FIXME figure out why we never reach this point
      fastify.log.info(`Received message from user ${userId}: ${raw.toString()}`)
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
          // TODO persist message in DB using sendMessage in message.service.ts
        }
      } catch (err) {
        fastify.log.error('Invalid WS message', err)
      }
    })
  })

}

export default messageWsRoutes
